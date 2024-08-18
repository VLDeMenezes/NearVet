import { PartialType } from '@nestjs/mapped-types';
import { CreateVetEspecialityDto } from './create-vet-especiality.dto';

export class UpdateVetEspecialityDto extends PartialType(CreateVetEspecialityDto) {}
