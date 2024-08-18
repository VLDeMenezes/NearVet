import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailabilityVetDto } from './create-availability-vet.dto';

export class UpdateAvailabilityVetDto extends PartialType(CreateAvailabilityVetDto) {}
