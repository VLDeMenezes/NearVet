import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailabilityService } from './entities/availability-service.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AvailabilityServiceRepository {

    constructor (
        @InjectRepository(AvailabilityService) private availabilityRepository: Repository<AvailabilityService>,
    ){}  
    
    async getAvailability() {
        return await this.availabilityRepository.find()
    }
    
    async getAvailabilityAtention(veterinarianId: string, day:number) {
        return await this.availabilityRepository.findOne({where: {veterinarianId, day}})
    }
}