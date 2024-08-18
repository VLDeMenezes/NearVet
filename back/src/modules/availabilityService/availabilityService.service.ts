import { Injectable } from '@nestjs/common';
import { CreateAvailabilityServiceDto } from './dto/create-availability-service.dto';
import { UpdateAvailabilityServiceDto } from './dto/update-availability-service.dto';

@Injectable()
export class AvailabilityServiceService {
  create(createAvailabilityServiceDto: CreateAvailabilityServiceDto) {
    return 'This action adds a new availabilityService';
  }

  findAll() {
    return `This action returns all availabilityService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availabilityService`;
  }

  update(id: number, updateAvailabilityServiceDto: UpdateAvailabilityServiceDto) {
    return `This action updates a #${id} availabilityService`;
  }

  remove(id: number) {
    return `This action removes a #${id} availabilityService`;
  }
}
