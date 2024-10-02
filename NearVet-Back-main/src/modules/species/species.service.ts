import { Injectable, NotFoundException } from '@nestjs/common';
import { speciesRepository } from './species.repository';
import { CreateSpeciesDto } from './dto/createSpecie.dto';
import { UpdateSpeciesDto } from './dto/updateSpecie.dto';


@Injectable()
export class SpeciesService {
  constructor (
    private readonly speciesRepository: speciesRepository
  ) {}

  async getAllSpeciesService() {
    return await this.speciesRepository.getAllSpeciesRepository();
  }

  async getSpecieByIdService(id: string) {
    const species = await this.speciesRepository.getSpecieByIdRepository(id);
    if (!species) {
      throw new NotFoundException(`Especie para buscar con el ID ${id} no encontrada`);
    }
    return {
      message: `Especie con el ID ${id} encontrada exitosamente`,
      species
    };
  }

  async createSpecieService(specie: CreateSpeciesDto) {
    return await this.speciesRepository.createSpeciesRepository(specie);
  }

  async updateSpecieService(id: string, updateSpeciesDto: UpdateSpeciesDto) {
    const species = await this.speciesRepository.updateSpeciesRepository(id, updateSpeciesDto);
    if (!species) {
      throw new NotFoundException(`Especie para modificar con el ID ${id} no encontrada`);
    }
    return {
      message: `Especie con el ID ${id} modificada exitosamente`,
      species
    };
  }

  async deleteSpecieService(id: string){
    const species = await this.speciesRepository.getSpecieByIdRepository(id);
    if (!species) {
      throw new NotFoundException(`Especie para eliminar con el ID ${id} no encontrada`);
    }
    await this.speciesRepository.deleteSpeciesRepository(id);
    return {
      message: `Especie con el ID ${id} eliminada exitosamente`,
      species
    };
  }
}
