import { PartialType } from '@nestjs/mapped-types';
import { CreateExceptionsVetDto } from './create-exceptions-vet.dto';

export class UpdateExceptionsVetDto extends PartialType(CreateExceptionsVetDto) {}
