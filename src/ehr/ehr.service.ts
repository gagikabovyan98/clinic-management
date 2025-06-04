import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EHR } from './entities/ehr.entity';
import { CreateEhrDto } from './dto/create-ehr.dto';
import { UpdateEhrDto } from './dto/update-ehr.dto';
import { Patient } from '../patients/entities/patient.entity';

@Injectable()
export class EhrService {
  constructor(
    @InjectRepository(EHR)
    private ehrRepository: Repository<EHR>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createEhrDto: CreateEhrDto): Promise<EHR> {
    const patient = await this.patientRepository.findOneBy({ id: createEhrDto.patientId });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    const ehr = this.ehrRepository.create({ ...createEhrDto, patient });
    return this.ehrRepository.save(ehr);
  }

  findAll(): Promise<EHR[]> {
    return this.ehrRepository.find({ relations: ['patient'] });
  }

  async findOne(id: number): Promise<EHR> {
    const ehr = await this.ehrRepository.findOne({ where: { id }, relations: ['patient'] });
    if (!ehr) {
      throw new NotFoundException(`EHR with id ${id} not found`);
    }
    return ehr;
  }


  async update(id: number, updateEhrDto: UpdateEhrDto): Promise<EHR> {
    const ehr = await this.ehrRepository.preload({ id, ...updateEhrDto });
    if (!ehr) {
      throw new NotFoundException(`EHR with id ${id} not found`);
    }
    if (updateEhrDto.patientId) {
      const patient = await this.patientRepository.findOneBy({ id: updateEhrDto.patientId });
      if (!patient) throw new NotFoundException('Patient not found');
      ehr.patient = patient;
    }
    return this.ehrRepository.save(ehr);
  }

  async remove(id: number): Promise<void> {
    const ehr = await this.findOne(id);
    if (!ehr) {
      throw new NotFoundException(`EHR with id ${id} not found`);
    }
    await this.ehrRepository.remove(ehr);
  }

  async addImages(id: number, imagePaths: string[]) {
    const ehr = await this.ehrRepository.findOneBy({ id });
    if (!ehr) throw new NotFoundException('EHR not found');
    ehr.images = [...(ehr.images || []), ...imagePaths];
    return this.ehrRepository.save(ehr);
  }
}
