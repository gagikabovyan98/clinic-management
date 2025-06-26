import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const hash = await bcrypt.hash(createPatientDto.password, 10);
    const patient = this.patientRepository.create({
      ...createPatientDto,
      password: hash,
    });
    return this.patientRepository.save(patient);
  }

  findAll() {
    return this.patientRepository.find();
  }

  findOne(id: number) {
    return this.patientRepository.findOneBy({ id });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientRepository.update(id, updatePatientDto);
  }

  remove(id: number) {
    return this.patientRepository.delete(id);
  }

 
  async findByEmail(email: string) {
    return this.patientRepository.findOneBy({ email });
  }
}
