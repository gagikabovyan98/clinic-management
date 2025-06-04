import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @Roles(Role.Staff, Role.Patient)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @Roles(Role.Staff, Role.Patient)
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Staff, Role.Patient)
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Staff, Role.Patient)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @Roles(Role.Staff, Role.Patient)
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @Roles(Role.Patient)
  getMe(@CurrentUser() user: JwtPayload) {
    return this.patientsService.findOne(user.sub);
  }
}


