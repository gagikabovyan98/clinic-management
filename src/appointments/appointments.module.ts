import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Staff } from '../staff/entities/staff.entity';
import { Room } from 'src/rooms/entities/room.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Staff, Room])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
