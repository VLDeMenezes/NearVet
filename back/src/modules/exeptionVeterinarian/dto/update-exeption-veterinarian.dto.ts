import { PartialType } from '@nestjs/mapped-types';
import { CreateExeptionVeterinarianDto } from './create-exeption-veterinarian.dto';

export class UpdateExeptionVeterinarianDto extends PartialType(CreateExeptionVeterinarianDto) {}
