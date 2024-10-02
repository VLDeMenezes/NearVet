import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { VetsRepository } from './vets.repository';

@Injectable()
export class VetsService {

  constructor(
    private readonly vetsRepository: VetsRepository
  ) {}

  async getAllVeterinaryService() {
    return await this.vetsRepository.getAllVeterinariesRepository();
  }

  async getVeterinaryByIdService(id: string) {
    return await this.vetsRepository.getVeterinaryByIdRepository(id);
  }

  async getVeterinaryLogo(): Promise<string> {
    return await this.vetsRepository.getVeterinaryLogo();
  }

  async createVeterinaryService(createVetDto: CreateVetDto) {
    return await this.vetsRepository.createVeterinaryRepository(createVetDto);
  }

  async updateVeterinaryService(id: string, updateVetDto: UpdateVetDto) {
    return await this.vetsRepository.updateVeterinaryRepository(id, updateVetDto);
  }

  async removeVeterinaryService(id: string) {
    return await this.vetsRepository.removeVeterinaryRepository(id);
  }
}
