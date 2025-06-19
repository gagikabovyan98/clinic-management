import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PatientsService } from '../patients/patients.service';
import { StaffService } from 'src/staff/staff.service';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { Role } from './roles.enum';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService,
  ) {}

  async registerStaff(dto: CreateStaffDto) {
    const existing = await this.staffService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Staff already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    return this.staffService.create({
      ...dto,
      password: hash,
      role: Role.Staff,
    });
  }

  async loginStaff(dto: LoginDto) {
    const user = await this.staffService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = await this.generateToken(user.id, Role.Staff);
    return { access_token: token };
  }

  async loginPatient(dto: LoginDto) {
    const user = await this.patientsService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = await this.generateToken(user.id, Role.Patient);
    return { access_token: token };
  }

  private async generateToken(userId: number, role: Role) {
    const payload = { sub: userId, role };
    return this.jwtService.signAsync(payload);
  }
}
