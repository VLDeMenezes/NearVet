import { Injectable } from '@nestjs/common';
import { CreateExceptionsVetDto } from './dto/create-exceptions-vet.dto';
import { UpdateExceptionsVetDto } from './dto/update-exceptions-vet.dto';

@Injectable()
export class ExceptionsVetService {
  create(createExceptionsVetDto: CreateExceptionsVetDto) {
    return 'This action adds a new exceptionsVet';
  }

  findAll() {
    return `This action returns all exceptionsVet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exceptionsVet`;
  }

  update(id: number, updateExceptionsVetDto: UpdateExceptionsVetDto) {
    return `This action updates a #${id} exceptionsVet`;
  }

  remove(id: number) {
    return `This action removes a #${id} exceptionsVet`;
  }
}
