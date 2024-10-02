import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalExaminationDto } from './create-clinical-examination.dto';

export class UpdateClinicalExaminationDto extends PartialType(CreateClinicalExaminationDto) {}
