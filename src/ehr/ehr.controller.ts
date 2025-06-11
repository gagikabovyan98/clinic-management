import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateEhrDto } from './dto/create-ehr.dto';
import { UpdateEhrDto } from './dto/update-ehr.dto';
import { EhrService } from './ehr.service';
import { diskStorage } from 'multer';
import { extname } from 'path'
import { FilesInterceptor } from '@nestjs/platform-express';

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
  findByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.ehrService.findByPatientId(patientId);
  }

  
  @Post(':id/upload')
  @Roles(Role.Staff)
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './uploads/ehr',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const paths = files.map(file => file.path);
    return this.ehrService.addImages(id, paths);
  }

}
