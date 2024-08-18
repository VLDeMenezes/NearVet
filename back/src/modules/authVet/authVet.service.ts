import { Injectable } from '@nestjs/common';
import { CreateAuthVetDto } from './dto/createAuthVet.dto';
import { UpdateAuthVetDto } from './dto/updateAuthVet.dto';

@Injectable()
export class AuthVetService {
  create(createAuthVetDto: CreateAuthVetDto) {
    return 'This action adds a new authVet';
  }

  findAll() {
    return `This action returns all authVet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authVet`;
  }

  update(id: number, updateAuthVetDto: UpdateAuthVetDto) {
    return `This action updates a #${id} authVet`;
  }

  remove(id: number) {
    return `This action removes a #${id} authVet`;
  }
}
