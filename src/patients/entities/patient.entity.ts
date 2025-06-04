import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EHR } from '../../ehr/entities/ehr.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';


@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date_of_birth: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => EHR, ehr => ehr.patient)
  ehrs: EHR[];

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}