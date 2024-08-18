import { Module } from '@nestjs/common';
import { ExeptionVeterinarianService } from './exeption-veterinarian.service';
import { ExeptionVeterinarianController } from './exeption-veterinarian.controller';

@Module({
  controllers: [ExeptionVeterinarianController],
  providers: [ExeptionVeterinarianService],
})
export class ExeptionVeterinarianModule {}
