import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailabilityServiceDto } from './create-availability-service.dto';

export class UpdateAvailabilityServiceDto extends PartialType(
  CreateAvailabilityServiceDto,
) {}
