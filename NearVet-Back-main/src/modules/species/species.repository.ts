import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Specie } from "./entities/specie.entity";
import { Repository } from "typeorm";


@Injectable()
export class speciesRepository {
    constructor(
        @InjectRepository(Specie) private readonly specieRepository: Repository<Specie>
    ) {}
    
    async getAllSpeciesRepository() {
        return await this.specieRepository.find();
      }
    
    async getSpecieByIdRepository(id: string) {
        return await this.specieRepository.findOneBy({id});
    }

    async createSpeciesRepository(specie: Partial<Specie>) {
        const newSpecie = this.specieRepository.create(specie);
        return await this.specieRepository.save(newSpecie);
    }

    async updateSpeciesRepository(id: string, specie: Partial<Specie>) {
        await this.specieRepository.update(id, specie);
        return await this.specieRepository.findOneBy({id});
    }

    async deleteSpeciesRepository(id: string) {
        await this.specieRepository.delete(id);
    }
}