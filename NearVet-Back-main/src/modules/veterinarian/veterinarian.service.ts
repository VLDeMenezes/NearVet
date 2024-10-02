import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { VeterinarianRepository } from './veterinarian.repository';
import { Veterinarian } from './entities/veterinarian.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class VeterinarianService {
  constructor(
    private readonly veterinarianRepository: VeterinarianRepository,
  ) {}

  async getVeteriarian(): Promise<Veterinarian[]> {
    return await this.veterinarianRepository.getVeteriarian();
  }

  async getVeterinarianById(id: string): Promise<Veterinarian> {
    const vet: Veterinarian = await this.veterinarianRepository.getVeterinarianById(id);
    if (!vet) {
      throw new NotFoundException('El Veterinario buscado no existe');
    }
    return vet;
  }

  async getVeterinarianByLicence(lic: number): Promise<Veterinarian> {
    const vet: Veterinarian = await this.veterinarianRepository.getVeterinarianByLicence(lic);
    if (!vet) {
      throw new NotFoundException(`El Veterinario buscado no existe`);
    }
    return vet;
  }

  async create(createVeterinarian: Partial<Veterinarian>): Promise<Veterinarian> {
    const vetCreated: Veterinarian = await this.veterinarianRepository.createVeterinarian(createVeterinarian);
    if (!vetCreated) {
      throw new InternalServerErrorException(`La creacione del veterinario no pudo concretarse`);
    }
    return vetCreated;
  }

  async update(id: string, vet: Partial<Veterinarian>): Promise<string> {
    const vetUpdate = await this.veterinarianRepository.updateVeterinarian(id, vet);
    if (vetUpdate.affected !== 1) throw new NotFoundException(`El Veterinario que intenta actualizar no existe`);
    return id;
  }

  async remove(id: string): Promise<string> {
    const vetRemove = await this.veterinarianRepository.removeVeterinarian(id);
    if (vetRemove.affected !== 1) throw new NotFoundException(`El Veterinario que intenta eliminar no existe`);
    return id;
  }

}
