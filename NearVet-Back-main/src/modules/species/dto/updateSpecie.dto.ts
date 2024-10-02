import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeciesDto } from './createSpecie.dto';

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {}
