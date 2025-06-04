import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { EhrService } from '../ehr/ehr.service';
import { Role } from '../auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly ehrService: EhrService,
  ) {}

  @Post('image/:ehrId')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Staff)
  async uploadImageToEhr(
    @UploadedFile() file: Express.Multer.File,
    @Param('ehrId') ehrId: number,
  ) {
    const url = await this.uploadService.uploadFile(file);
    return this.ehrService.addImages(+ehrId, [url]);
  }
}
