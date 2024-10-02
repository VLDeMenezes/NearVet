import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race } from './entitites/race.entity';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Injectable()
export class RaceRepository {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
  ) {}

  async getAllRacesRepository() {
    return await this.raceRepository.find();
  }

  async getRaceByIdRepository(id: string) {
    return await this.raceRepository.findOne({ where: { id } });
  }

  async createRaceRepository(race: CreateRaceDto) {
    const newRace = this.raceRepository.create(race);
    return await this.raceRepository.save(newRace);
  }

  async updateRaceRepository(id: string, race: UpdateRaceDto) {
    await this.raceRepository.update(id, race);
    return await this.raceRepository.findOneBy({id});
  }

  async deleteRaceRepository(id: string) {
    await this.raceRepository.delete(id);
  }
}
