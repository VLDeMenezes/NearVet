import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Pending } from './entities/pending.entity';

@Injectable()
export class PendingRepository {
  constructor(
    @InjectRepository(Pending) private pendingRepository: Repository<Pending>,
  ) {}

  async getAllPendingsRepository(): Promise<Pending[]> {
    return await this.pendingRepository.find({relations: {service:true, pet:true}});
  }

  async getPendingByIdRepository(id: string): Promise<Pending> {
    return await this.pendingRepository.findOne({where:{ id }, relations: {service:true}});
  }

  async getAllUsersPendingRepository(
    userId: string,
  ): Promise<Pending[]> {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { pet: { userId }, endPending: LessThanOrEqual(today) },
      relations: { service: true, pet: true }
    });
  }

  async getPendingByPetRepository(petId: string) {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { petId, endPending: MoreThanOrEqual(today) },
      relations: { service: true }
    });
  }

  async getActivePendingRepository() {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { endPending: MoreThanOrEqual(today) },
      relations: { service: true, pet: { user: true } }
    });
  }

  async getPendingByVeterinarianRepository(veterinarianId: string) {
    const today = new Date();
    return await this.pendingRepository.find({
      where: { service: { veterinarian: { userId: veterinarianId } }, endPending: LessThanOrEqual(today) },  
      relations: { service: { veterinarian: true }, pet: true }
    });
  }

  async createPendingRepository(pending: Partial<Pending>): Promise<Pending> {
    return await this.pendingRepository.save(pending);
  }

  async updatePendingRepository(id: string, pending: Partial<Pending>): Promise<Pending> {
    await this.pendingRepository.update(id, pending);
    return await this.pendingRepository.findOneBy({ id });
  }

  async deletePendingRepository(id: string): Promise<void> {
    await this.pendingRepository.delete(id);
  }
}
