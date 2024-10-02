import { PartialType } from '@nestjs/swagger';
import { CreatePendingDto } from './create-pending.dto';

export class UpdatePendingDto extends PartialType(CreatePendingDto) {}
