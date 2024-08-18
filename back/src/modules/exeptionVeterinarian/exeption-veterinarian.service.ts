import { Injectable } from '@nestjs/common';
import { CreateExeptionVeterinarianDto } from './dto/create-exeption-veterinarian.dto';
import { UpdateExeptionVeterinarianDto } from './dto/update-exeption-veterinarian.dto';

@Injectable()
export class ExeptionVeterinarianService {
  create(createExeptionVeterinarianDto: CreateExeptionVeterinarianDto) {
    return 'This action adds a new exeptionVeterinarian';
  }

  findAll() {
    return `This action returns all exeptionVeterinarian`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exeptionVeterinarian`;
  }

  update(id: number, updateExeptionVeterinarianDto: UpdateExeptionVeterinarianDto) {
    return `This action updates a #${id} exeptionVeterinarian`;
  }

  remove(id: number) {
    return `This action removes a #${id} exeptionVeterinarian`;
  }
}
