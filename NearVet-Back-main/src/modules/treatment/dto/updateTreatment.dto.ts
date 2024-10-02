import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentDto } from './createTreatment.dto';

export class UpdateTreatmentDto extends PartialType(CreateTreatmentDto) {}
