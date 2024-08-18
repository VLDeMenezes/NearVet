import { Module } from '@nestjs/common';
import { AvailabilityVetService } from './availability-vet.service';
import { AvailabilityVetController } from './availability-vet.controller';

@Module({
  controllers: [AvailabilityVetController],
  providers: [AvailabilityVetService],
})
export class AvailabilityVetModule {}
