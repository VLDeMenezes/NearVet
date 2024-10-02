import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MethodPay } from './entities/method-pay.entity';

@Injectable()
export class MethodPayRepository {
  constructor(
    @InjectRepository(MethodPay)
    private readonly methodPayRepository: Repository<MethodPay>,
  ) {}

  async getAllMethodPaysRepository() {
    return await this.methodPayRepository.find();
  }

  async getMethodPayByIdRepository(id: string) {
    return await this.methodPayRepository.findOneBy({ id });
  }

  async createMethodPayRepository(methodPay: Partial<MethodPay>) {
    const newMethodPay = this.methodPayRepository.create(methodPay);
    return await this.methodPayRepository.save(newMethodPay);
  }

  async updateMethodPayRepository(id: string, methodPay: Partial<MethodPay>) {
    await this.methodPayRepository.update(id, methodPay);
    return await this.methodPayRepository.findOneBy({ id });
  }

  async deleteMethodPayRepository(id: string) {
    await this.methodPayRepository.delete(id);
  }
}
