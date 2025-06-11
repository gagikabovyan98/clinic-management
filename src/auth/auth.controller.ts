import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('staff/register')
  registerStaff(@Body() dto: CreateStaffDto) {
    return this.authService.registerStaff(dto);
  }

  @Public()
  @Post('staff/login')
  loginStaff(@Body() dto: LoginDto) {
    return this.authService.loginStaff(dto);
  }
}
