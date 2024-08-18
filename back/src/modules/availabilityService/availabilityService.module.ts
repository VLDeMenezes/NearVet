import { Module } from '@nestjs/common';
import { AvailabilityServiceService } from './availabilityService.service';
import { AvailabilityServiceController } from './availabilityService.controller';

@Module({
  controllers: [AvailabilityServiceController],
  providers: [AvailabilityServiceService],
})
export class AvailabilityServiceModule {}
