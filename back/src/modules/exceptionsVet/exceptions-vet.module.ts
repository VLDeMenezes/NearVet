import { Module } from '@nestjs/common';
import { ExceptionsVetService } from './exceptions-vet.service';
import { ExceptionsVetController } from './exceptions-vet.controller';

@Module({
  controllers: [ExceptionsVetController],
  providers: [ExceptionsVetService],
})
export class ExceptionsVetModule {}
