import { Module } from '@nestjs/common';
import { VeterinarianService } from './veterinarian.service';
import { VeterinarianController } from './veterinarian.controller';

@Module({
  controllers: [VeterinarianController],
  providers: [VeterinarianService],
})
export class VeterinarianModule {}
