import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileVetDto } from './create-profile-vet.dto';

export class UpdateProfileVetDto extends PartialType(CreateProfileVetDto) {}
