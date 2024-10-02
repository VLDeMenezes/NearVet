import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionRepository } from './prescription.repository';
import { Prescription } from './entities/prescription.entity';
import { SaleProductsService } from '../sale-products/sale-products.service';

@Injectable()
export class PrescriptionService {
  constructor(private readonly prescriptionRepository: PrescriptionRepository,
    private readonly saleProductService: SaleProductsService
  ) {}

  async getAllPrescriptions() {
    return await this.prescriptionRepository.getAllPrescriptionsRepository();
  }

  async getPrescriptionById(id: string) {
    return await this.prescriptionRepository.getPrescriptionByIdRepository(id);
  }

  async getAllPrescriptionsByPet(petId: string) {
    return await this.prescriptionRepository.getAllPrescriptionsByPetRepository(petId);
  }

  async getAllPrescriptionsByClinicalExamination(clinicalExaminationId: string) {
    return await this.prescriptionRepository.getAllPrescriptionsByClinicalExaminationRepository(clinicalExaminationId);
  }

  async createPrescription(createPrescription: Partial<Prescription>): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.createPrescriptionRepository(createPrescription)
    if (!prescription) throw new InternalServerErrorException ("No se puedo crear la Receta Medica")
    const prescriptionSale = await this.prescriptionRepository.getPrescriptionByIdRepository(prescription.id);
    await this.saleProductService.createSalesProduct({saleId: prescriptionSale.clinicalExamination.saleId, productId: prescription.productId, price: prescriptionSale.product.price, acount: 1});
    return prescriptionSale;
  }

  async updatePrescription(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    return await this.prescriptionRepository.updatePrescriptionRepository(id, updatePrescriptionDto);
  }

  async deletePrescription(id: string) {
    const prescription = await this.prescriptionRepository.getPrescriptionByIdRepository(id);
    if (!prescription) {
      throw new NotFoundException(`Prescripción para eliminar con el ID ${id} no encontrada`);
    }
    await this.prescriptionRepository.deletePrescriptionRepository(id);
    return prescription;
  }
}
