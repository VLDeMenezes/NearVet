import { Injectable, NotFoundException } from '@nestjs/common';
import { RaceRepository } from './races.repository';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Injectable()
export class RacesService {
  constructor(private readonly raceRepository: RaceRepository) {}

  async getAllRacesService() {
    return await this.raceRepository.getAllRacesRepository();
  }

  async getRaceByIdService(id: string) {
    return await this.raceRepository.getRaceByIdRepository(id);
  }

  async createRaceService(race: CreateRaceDto) {
    return await this.raceRepository.createRaceRepository(race);
  }

  async updateRaceService(id: string, updateRaceDto: UpdateRaceDto) {
    return await this.raceRepository.updateRaceRepository(id, updateRaceDto);
  }

  async deleteRaceService(id: string) {
    const race = await this.raceRepository.getRaceByIdRepository(id);
    if (!race) {
      throw new NotFoundException(`Raza para eliminar con el ID ${id} no encontrada`);
    }
    await this.raceRepository.deleteRaceRepository(id);
    return race;
  }
}
