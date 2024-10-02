import { PartialType } from '@nestjs/mapped-types';
import { CreateMethodPayDto } from './create-method-pay.dto';

export class UpdateMethodPayDto extends PartialType(CreateMethodPayDto) {}
