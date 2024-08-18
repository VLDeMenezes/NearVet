import { Injectable } from '@nestjs/common';
import { CreateAvailabilityVetDto } from './dto/create-availability-vet.dto';
import { UpdateAvailabilityVetDto } from './dto/update-availability-vet.dto';

@Injectable()
export class AvailabilityVetService {
  create(createAvailabilityVetDto: CreateAvailabilityVetDto) {
    return 'This action adds a new availabilityVet';
  }

  findAll() {
    return `This action returns all availabilityVet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availabilityVet`;
  }

  update(id: number, updateAvailabilityVetDto: UpdateAvailabilityVetDto) {
    return `This action updates a #${id} availabilityVet`;
  }

  remove(id: number) {
    return `This action removes a #${id} availabilityVet`;
  }
}
