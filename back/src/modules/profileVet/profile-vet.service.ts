import { Injectable } from '@nestjs/common';
import { CreateProfileVetDto } from './dto/create-profile-vet.dto';
import { UpdateProfileVetDto } from './dto/update-profile-vet.dto';

@Injectable()
export class ProfileVetService {
  create(createProfileVetDto: CreateProfileVetDto) {
    return 'This action adds a new profileVet';
  }

  findAll() {
    return `This action returns all profileVet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileVet`;
  }

  update(id: number, updateProfileVetDto: UpdateProfileVetDto) {
    return `This action updates a #${id} profileVet`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileVet`;
  }
}
