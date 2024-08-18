import { Module } from '@nestjs/common';
import { AuthVetService } from './authVet.service';
import { AuthVetController } from './authVet.controller';

@Module({
  controllers: [AuthVetController],
  providers: [AuthVetService],
})
export class AuthVetModule {}
