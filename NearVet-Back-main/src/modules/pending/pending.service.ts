import { Injectable, NotFoundException } from '@nestjs/common';
import { PendingRepository } from './pending.repository';
import { Pending } from './entities/pending.entity';
import { CreatePendingDto } from './dto/create-pending.dto';
import { UpdatePendingDto } from './dto/update-pending.dto';

@Injectable()
export class PendingService {
  constructor(private readonly pendingRepository: PendingRepository) {}

  async getAllPendings() {
    return await this.pendingRepository.getAllPendingsRepository();
  }

  async getPendingById(id: string) {
    return await this.pendingRepository.getPendingByIdRepository(id);
  }

  async getAllUsersPending(userId: string): Promise<Pending[]> {
    return await this.pendingRepository.getAllUsersPendingRepository(userId);
  }

  async getPendingByPet(petId: string) {
    return await this.pendingRepository.getPendingByPetRepository(petId);
  }

  async getActivePending() {
    return await this.pendingRepository.getActivePendingRepository();
  }

  async getPendingByVeterinarian(veterinarianId: string) {
    return await this.pendingRepository.getPendingByVeterinarianRepository(veterinarianId);
  }

  async createPending(createPendingDto: CreatePendingDto): Promise<Pending> {
    return await this.pendingRepository.createPendingRepository(createPendingDto);
  }

  async updatePending(id: string, updatePendingDto: UpdatePendingDto) {
    return await this.pendingRepository.updatePendingRepository(id, updatePendingDto);
  }

  async deletePending(id: string) {
    const pending = await this.pendingRepository.getPendingByIdRepository(id);
    await this.pendingRepository.deletePendingRepository(id);
    return pending;
  }
}
