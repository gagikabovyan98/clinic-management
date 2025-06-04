import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient } from '../patients/entities/patient.entity';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const patient = await this.patientRepository.findOneBy({ id: dto.patientId });
    if (!patient) throw new NotFoundException('Patient not found');

    const staff = await this.staffRepository.findOneBy({ id: dto.staffId });
    if (!staff) throw new NotFoundException('Staff not found');

    const appointment = this.appointmentRepository.create({
      appointmentDate: new Date(dto.appointmentDate),
      reason: dto.reason,
      patient,
      staff,
      status: 'scheduled',
    });

    return this.appointmentRepository.save(appointment);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['patient', 'staff'] });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'staff'],
    });

    if (!appointment) throw new NotFoundException(`Appointment #${id} not found`);
    return appointment;
  }

  async update(id: number, dto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.preload({
      id,
      ...dto,
      appointmentDate: dto.appointmentDate ? new Date(dto.appointmentDate) : undefined,
    });

    if (!appointment) throw new NotFoundException(`Appointment #${id} not found`);

    if (dto.patientId) {
      const patient = await this.patientRepository.findOneBy({ id: dto.patientId });
      if (!patient) throw new NotFoundException('Patient not found');
      appointment.patient = patient;
    }

    if (dto.staffId) {
      const staff = await this.staffRepository.findOneBy({ id: dto.staffId });
      if (!staff) throw new NotFoundException('Staff not found');
      appointment.staff = staff;
    }

    return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }
}
