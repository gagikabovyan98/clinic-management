import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateEhrDto } from './dto/create-ehr.dto';
import { UpdateEhrDto } from './dto/update-ehr.dto';
import { EhrService } from './ehr.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ehr')
export class EhrController {
  constructor(private readonly ehrService: EhrService) {}

  @Post()
  @Roles(Role.Staff)
  create(@Body() createEhrDto: CreateEhrDto) {
    return this.ehrService.create(createEhrDto);
  }

  @Get()
  @Roles(Role.Staff)
  findAll() {
    return this.ehrService.findAll();
  }

  @Get(':id')
  @Roles(Role.Staff, Role.Patient)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ehrService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Staff)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEhrDto: UpdateEhrDto) {
    return this.ehrService.update(id, updateEhrDto);
  }

  @Delete(':id')
  @Roles(Role.Staff)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ehrService.remove(id);
  }

  @Get('/patient/:patientId')
  @Roles(Role.Staff, Role.Patient)
  findByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.ehrService.findByPatientId(patientId);
  }

  @Post('upload/:patientId')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Staff)
  uploadImage(
    @Param('patientId', ParseIntPipe) patientId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ehrService.saveImage(patientId, file.filename);
  }

  @Get('records')
  @Roles(Role.Patient)
  getRecordsForPatient(@Req() req: Request) {
    const user = req.user as { userId: number };
    return this.ehrService.findByPatientId(user.userId);
  }
}