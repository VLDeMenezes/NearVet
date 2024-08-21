import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  getPets() {
    return `This action returns all pets`;
  }

  getPetById(id: number) {
    return `This action returns a #${id} pet`;
  }

  createPet(createPetDto: CreatePetDto) {
    return 'This action adds a new pet';
  }

  updatePet(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  removePet(id: number) {
    return `This action removes a #${id} pet`;
  }
}
