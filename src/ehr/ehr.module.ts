import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EhrService } from './ehr.service';
import { EHR } from './entities/ehr.entity';
import { EhrController } from './ehr.controller';
import { Patient } from '../patients/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EHR, Patient])],
  controllers: [EhrController],
  providers: [EhrService],
  exports: [EhrService],
})
export class EhrModule {}
