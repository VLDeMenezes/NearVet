import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { User } from '../users/entities/user.entity';
import { Sex } from './entities/sex.entity';
import { Race } from '../races/entitites/race.entity';
import { UsersRepository } from '../users/users.repository';
import { Specie } from '../species/entities/specie.entity';

@Injectable()
export class PetsRepository {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    @InjectRepository(Sex) private readonly sexRepository: Repository<Sex>,
    @InjectRepository(Specie) private readonly specieRepository: Repository<Specie>,
    @InjectRepository(Race) private readonly raceRepository: Repository<Race>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPetsSexService(): Promise<Sex[]> {
    return await this.sexRepository.find();
  }
  async getPetSpeciesandRacesRepository(): Promise<Specie[]> {
    return await this.specieRepository.find({ relations: { races: true } });
  }

  async getPetSpeciesRepository(): Promise<Specie[]> {
    return await this.specieRepository.find();
  }

  async getPetRacesRepository(specie: string): Promise<Race[]> {
    const specieDB: Specie = await this.specieRepository.findOne({
      where: { specie },
      relations: { races: true },
    });
    return specieDB.races;
  } 

  async getPetsRepository(): Promise<Pet[]> {
    return await this.petsRepository.find({ 
          relations: { race: true, specie: true, sex: true } });
  }

  async getPetByIdRepository(id: string) {
    const pet = await this.petsRepository.findOne({
      where: { id },
      relations: { specie: true, race: true, sex: true },
    });
    if (!pet) {
      throw new NotFoundException(`Mascota con el ID ${id} no encontrada`);
    }
    return pet
  }

  async getPetsByUserRepository(id: string): Promise<Pet[]> {
    const pets = await this.petsRepository.find({ where: { userId: id , endDate: null}, relations: { sex: true, race: true, specie: true } });
    return pets;
  }

  async createPetRepository(pet: Partial<Pet>) {
    const { userId, sexId, specieId, raceId } = pet;

    const user: User = await this.usersRepository.getUserByIdRepository(userId);
    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con el id ${userId} para registrar su mascota`);
    }

    const sex: Sex = await this.sexRepository.findOneBy({ id: sexId });
    if (!sex) {
      throw new NotFoundException(`No se encontro el sexo con el id ${sexId} para registrar su mascota`);
    }

    const specie: Specie = await this.specieRepository.findOneBy({ id: specieId });
    if (!specie) throw new NotFoundException(`No se encontro la especie con el id ${specieId} para registrar su mascota`);

    const race: Race = await this.raceRepository.findOneBy({ id: raceId });
    if (!race) {
      throw new NotFoundException(`No se encontro el sexo con el id ${raceId} para registrar su mascota`);
    }

    const newPet = this.petsRepository.create({
      ...pet,
      user,
      sex,
      specie,
      race,
    });
    const savedPet = await this.petsRepository.save(newPet);
    return savedPet;
  }

  async updatePetRepository(id: string, petData: Partial<Pet>) {
    const pet = await this.petsRepository.findOneBy({ id });
    if (!pet) throw new NotFoundException(`Mascota para modificar con el ID ${id} no encontrada`);
    await this.petsRepository.update(id, petData);
    return await this.getPetByIdRepository(id);
  }

  async removePetRepository(id: string) {
    const pet = await this.petsRepository.findOne({ where: {id}, relations: {clinicalExaminations:true, appointments:true} });
    if (!pet) throw new NotFoundException(`Mascota para eliminar con el ID ${id} no encontrada`);
    let result
    if (pet.clinicalExaminations.length>0 || pet.appointments.length>0) {
      result = await this.petsRepository.update(id, {endDate: new Date()})
    } else {result = await this.petsRepository.delete(id);}
    return result;
  }
}
