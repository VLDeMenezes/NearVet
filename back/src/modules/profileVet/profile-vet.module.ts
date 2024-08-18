import { Module } from '@nestjs/common';
import { ProfileVetService } from './profile-vet.service';
import { ProfileVetController } from './profile-vet.controller';

@Module({
  controllers: [ProfileVetController],
  providers: [ProfileVetService],
})
export class ProfileVetModule {}
