import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Staff } from '../../staff/entities/staff.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  patient: Patient;

  @ManyToOne(() => Staff, staff => staff.appointments, { onDelete: 'SET NULL' })
  staff: Staff;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ type: 'text' })
  reason: string;

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'completed' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;
}
