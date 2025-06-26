import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient } from '../patients/entities/patient.entity';
import { Staff } from '../staff/entities/staff.entity';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const patient = await this.patientRepo.findOneBy({ id: dto.patientId });
    const staff = await this.staffRepo.findOneBy({ id: dto.staffId });
    const room = await this.roomRepo.findOneBy({ id: dto.roomId });

    if (!patient) throw new NotFoundException('Patient not found');
    if (!staff) throw new NotFoundException('Staff not found');
    if (!room) throw new NotFoundException('Room not found');

    const isRoomBusy = await this.appointmentRepo.findOne({
      where: {
        room: { id: dto.roomId },
        appointmentDate: dto.appointmentDate,
        status: In(['scheduled', 'in-progress']), // если есть статус завершения — можно убрать completed
      },
    });

    if (isRoomBusy) {
      throw new ConflictException('Room is already occupied at this time');
    }

    const appointment = this.appointmentRepo.create({
      appointmentDate: dto.appointmentDate,
      reason: dto.reason,
      status: 'scheduled',
      patient,
      staff,
      room,
    });

    return this.appointmentRepo.save(appointment);
  }


  async findAll() {
    return this.appointmentRepo.find({
      relations: ['patient', 'staff', 'room'],
    });
  }

  async findOne(id: number) {
    const appt = await this.appointmentRepo.findOne({ where: { id }, relations: ['patient', 'staff', 'room'] });
    if (!appt) throw new NotFoundException('Appointment not found');
    return appt;
  }

async update(id: number, dto: UpdateAppointmentDto) {
  const appt = await this.appointmentRepo.findOneBy({ id });
  if (!appt) throw new NotFoundException('Appointment not found');

  if (dto.status) appt.status = dto.status;
  if (dto.appointmentDate) appt.appointmentDate = dto.appointmentDate;
  if (dto.reason) appt.reason = dto.reason;

  if (dto.patientId) {
    const patient = await this.patientRepo.findOneBy({ id: dto.patientId });
    if (!patient) throw new NotFoundException('Patient not found');
    appt.patient = patient;
  }

  if (dto.staffId) {
    const staff = await this.staffRepo.findOneBy({ id: dto.staffId });
    if (!staff) throw new NotFoundException('Staff not found');
    appt.staff = staff;
  }

  if (dto.roomId) {
    const room = await this.roomRepo.findOneBy({ id: dto.roomId });
    if (!room) throw new NotFoundException('Room not found');
    appt.room = room;
  }

  return this.appointmentRepo.save(appt);
}


  async remove(id: number) {
    const appt = await this.appointmentRepo.findOneBy({ id });
    if (!appt) throw new NotFoundException('Appointment not found');
    return this.appointmentRepo.remove(appt);
  }
}
