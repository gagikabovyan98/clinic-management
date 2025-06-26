import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

@Entity()
export class EHR {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.ehrs, { onDelete: 'CASCADE' })
  patient: Patient;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('simple-array', { nullable: true })
  images: string[];
}