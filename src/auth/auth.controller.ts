import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('patient/register')
  registerPatient(@Body() dto: CreatePatientDto) {
    return this.authService.registerPatient(dto);
  }

  @Post('staff/register')
  registerStaff(@Body() dto: CreateStaffDto) {
    return this.authService.registerStaff(dto);
  }

  @Post('patient/login')
  loginPatient(@Body() dto: LoginDto) {
    return this.authService.loginPatient(dto);
  }

  @Post('staff/login')
  loginStaff(@Body() dto: LoginDto) {
    return this.authService.loginStaff(dto);
  }
}
