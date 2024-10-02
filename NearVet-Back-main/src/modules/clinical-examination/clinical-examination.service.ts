import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClinicalExaminationRepository } from './clinical-examination.repository';
import { ClinicalExamination } from './entities/clinicalExamination.entity';
import { DeleteResult, Or, Repository, UpdateResult } from 'typeorm';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesService } from '../sales/sales.service';
import { Sale } from '../sales/entities/sale.entity';

@Injectable()
export class ClinicalExaminationService {

  constructor (private readonly examinationRepository: ClinicalExaminationRepository,
    @InjectRepository(Veterinarian) private veterinarianRepository: Repository<Veterinarian>,
    private readonly saleService: SalesService,
  ) {}

  async getExaminations (): Promise<ClinicalExamination[]> {
    return await this.examinationRepository.getExaminations()
  }

  async getExaminationById (id:string): Promise<ClinicalExamination> {
    const examination:ClinicalExamination = await this.examinationRepository.getExaminationById(id)
    if (!examination) throw new NotFoundException("La Atencion Medica buscada no existe");
    return examination
  }

  async getExaminationByPetId (petId:string): Promise<ClinicalExamination[]> {
      return await this.examinationRepository.getExaminationByPetId(petId)
  }

  async getExaminationByVeterinarianId (veterinarianId:string): Promise<ClinicalExamination[]> {
    return await this.examinationRepository.getExaminationByPetId(veterinarianId)
  }

  async createExamination (examination:Partial<ClinicalExamination>): Promise<ClinicalExamination> {
    const veterinarian: Veterinarian = await this.veterinarianRepository.findOne({where: [{userId:examination.veterinarianId}, {id: examination.veterinarianId}]});
    if (!veterinarian) throw new NotFoundException("El usuario ingresado no es un veterinario")
    const examinationCreated: ClinicalExamination = await this.examinationRepository.createExamination({...examination, veterinarianId: veterinarian.id})
    const examinationUser: ClinicalExamination = await this.examinationRepository.getExaminationById(examinationCreated.id)
    if (!examinationCreated) throw new InternalServerErrorException("No se pudo crear la Atencion Medica");
    const sale: Sale = await this.saleService.createSale({date: new Date(examinationCreated.date), advancedPay: 9000, userId: examinationUser.pet.userId });
    await this.examinationRepository.updateExamination(examinationCreated.id, { saleId: sale.id});
    return {...examinationCreated, saleId:sale.id}
  }

  async updateExamination (id: string, examination:Partial<ClinicalExamination>): Promise<string> {
    const examinationUpdate: UpdateResult = await this.examinationRepository.updateExamination(id, examination)
    if (examinationUpdate.affected === 0) throw new NotFoundException("No se encontro la atencion medica a}} actualizar");
    return id;
  }

  async removeExamination (id: string): Promise<string> {
    const examinationDelete: DeleteResult = await this.examinationRepository.removeExamination(id)
    if (examinationDelete.affected === 0) throw new NotFoundException("No se encontro la atencion medica a eliminar");
    return id;
  }
}
