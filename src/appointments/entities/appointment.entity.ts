import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Staff } from '../../staff/entities/staff.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointmentDate: string;

  @Column()
  reason: string;

  @Column({ default: 'scheduled' })
  status: 'scheduled' | 'completed' | 'cancelled';

  @ManyToOne(() => Patient, { onDelete: 'SET NULL' })
  patient: Patient;

  @ManyToOne(() => Staff, { onDelete: 'SET NULL' })
  staff: Staff;

  @ManyToOne(() => Room, { onDelete: 'SET NULL', nullable: true })
  room: Room;
}
