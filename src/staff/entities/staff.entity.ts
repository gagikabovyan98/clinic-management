import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  role: string;

  @Column({nullable: true})
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  specialization: string;

  @OneToMany(() => Appointment, appointment => appointment.staff)
  appointments: Appointment[];
}
