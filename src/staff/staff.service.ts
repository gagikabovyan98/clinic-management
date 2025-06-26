import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Role } from 'src/auth/roles.enum';



@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  create(createStaffDto: CreateStaffDto) {
    const staff = this.staffRepository.create(createStaffDto);
    return this.staffRepository.save(staff);
  }

  findAll() {
    return this.staffRepository.find();
  }

  findOne(id: number) {
    return this.staffRepository.findOneBy({ id });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffRepository.update(id, updateStaffDto);
  }

  remove(id: number) {
    return this.staffRepository.delete(id);
  }

  async findByEmail(email: string) {
    return this.staffRepository.findOneBy({ email });
  }
}