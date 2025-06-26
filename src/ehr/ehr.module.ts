import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EhrService } from './ehr.service';
import { EHR } from './entities/ehr.entity';
import { EhrController } from './ehr.controller';
import { Patient } from '../patients/entities/patient.entity';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/ehr',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
    TypeOrmModule.forFeature([EHR, Patient]),
  ],
  controllers: [EhrController],
  providers: [EhrService],
  exports: [EhrService],
})
export class EhrModule {}