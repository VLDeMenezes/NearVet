import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';

@Injectable()
export class PrescriptionRepository {
  constructor(
    @InjectRepository(Prescription) private prescriptionRepository: Repository<Prescription>,
  ) {}

  async getAllPrescriptionsRepository() {
    return await this.prescriptionRepository.find({relations: {product:true}});
  }

  async getPrescriptionByIdRepository(id: string) {
    return await this.prescriptionRepository.findOne({
      where: { id },
      relations: {product:true, clinicalExamination:true},
    });
  }

  async getAllPrescriptionsByPetRepository(petId: string) {
    return await this.prescriptionRepository.find({
      where: {
        clinicalExamination: {petId},
      },
      relations: {
        product: true,
      },
    });
  }

  async getAllPrescriptionsByClinicalExaminationRepository(clinicalExaminationId: string) {
    return await this.prescriptionRepository.find({
      where: {
        clinicalExaminationId
      },
      relations: {
        product: true
      }
    })
  }

  async createPrescriptionRepository(prescription: Partial<Prescription>) {
    return await this.prescriptionRepository.save(prescription);
  }

  async updatePrescriptionRepository(id: string, prescription: Partial<Prescription>) {
    await this.prescriptionRepository.update(id, prescription);
    return await this.prescriptionRepository.findOneBy({ id });
  }

  async deletePrescriptionRepository(id: string) {
    await this.prescriptionRepository.delete(id);
  }
}
