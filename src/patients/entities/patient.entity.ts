import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EHR } from '../../ehr/entities/ehr.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';


@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: string;

  @Column({nullable: true})
  gender: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  phone: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => EHR, ehr => ehr.patient)
  ehrs: EHR[];

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}