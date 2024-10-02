import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Veterinarian } from "./entities/veterinarian.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class VeterinarianRepository {
    
    constructor (  
        @InjectRepository(Veterinarian) private readonly veterinarianRepository: Repository<Veterinarian>
    ) {}

    async getVeteriarian(): Promise<Veterinarian[]> {
      return await this.veterinarianRepository.find({relations: {user:true}});
    }

    async getVeterinarianById(id: string): Promise<Veterinarian> {
      return await this.veterinarianRepository.findOne({where: [{id}, {userId: id}], relations: {user:true}})
    }
    
    async getVeterinarianByLicence(licence: number): Promise<Veterinarian> {
        return await this.veterinarianRepository.findOne({where: {licence}, relations: {user:true}})
      }

    async createVeterinarian(vet: Partial<Veterinarian>): Promise<Veterinarian> {
      const veterinarian: Veterinarian = await this.veterinarianRepository.save(vet);
      return await this.getVeterinarianById(veterinarian.id)
      }
    
    async updateVeterinarian(id: string, vet: Partial<Veterinarian>): Promise<UpdateResult> {
      const vetFind: Veterinarian= await this.veterinarianRepository.findOneBy({userId:id});
      return await this.veterinarianRepository.update(vetFind.id, vet)
    }

    async removeVeterinarian(id: string): Promise<DeleteResult> {
      return await this.veterinarianRepository.delete(id)
    }

    async getVeterianrianDelayAtention(id: string): Promise<Veterinarian> {
          return await this.veterinarianRepository.findOne({ 
                        where: {id},
                        select: ["delayAtention"]
                     })
}

}