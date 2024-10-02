import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TreatmentRepository } from './treatment.repository';
import { Treatment } from './entities/treatment.entity';
import { SaleServicesService } from '../sale-services/sale-services.service';

@Injectable()
export class TreatmentService {
  
  constructor (private readonly treatmentRepository: TreatmentRepository,
    private readonly saleServiceService: SaleServicesService
  ){}

  async getTreatments () {
    return await this.treatmentRepository.getTreatments();
}

async getTreatmentById (id:string): Promise<Treatment>  {
  const treatment: Treatment = await this.treatmentRepository.getTreatmentById(id);
  if (!treatment) throw new NotFoundException("No existe el tratamiento buscado")
  return treatment;
}

async getTreatmentsByService(serviceId: string): Promise<Treatment[]> {
  return await this.treatmentRepository.getTreatmentsByService(serviceId);
}

async getTreatmentsByPet(petId: string): Promise<Treatment[]> {
  return await this.treatmentRepository.getTreatmentsByPet(petId);
}

async createTreatment (treatment: Partial<Treatment>): Promise<Treatment> {
  const treatmentCreated: Treatment = await this.treatmentRepository.createTreatment(treatment);
  if (!treatmentCreated) throw new InternalServerErrorException("No se pudo crear el nuevo tratamiento")
  const treatmentSale = await this.treatmentRepository.getTreatmentById(treatment.id);
  await this.saleServiceService.createSalesService({saleId: treatmentSale.clinicalExamination.saleId, serviceId: treatmentSale.serviceId, price: treatmentSale.service.price, acount: 1});
  return treatmentCreated;
}

async updateTreatment (id: string , treatment: Partial<Treatment>): Promise<string> {
  const update = await this.treatmentRepository.updateTreatment(id, treatment);
  if (update.affected === 0) throw new NotFoundException("No se encontraro el tratamiento a actualizar")
  return id
} 

async removeTreatment (id: string): Promise<string> {
  const remove = await this.treatmentRepository.removeTreatment(id);
  if (remove.affected === 0) throw new NotFoundException("No se encontraro el tratamiento a eliminar")
  return id
} 
}
