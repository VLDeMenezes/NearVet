import { Injectable } from '@nestjs/common';
import { CreateAuthGlobalDto } from './dto/createAuthGlobal.dto';
import { UpdateAuthGlobalDto } from './dto/updateAuthGlobal.dto';

@Injectable()
export class AuthGlobalService {
  create(createAuthGlobalDto: CreateAuthGlobalDto) {
    return 'This action adds a new authGlobal';
  }

  findAll() {
    return `This action returns all authGlobal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authGlobal`;
  }

  update(id: number, updateAuthGlobalDto: UpdateAuthGlobalDto) {
    return `This action updates a #${id} authGlobal`;
  }

  remove(id: number) {
    return `This action removes a #${id} authGlobal`;
  }
}
