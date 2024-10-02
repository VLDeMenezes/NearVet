import { PartialType } from '@nestjs/swagger';
import { CreateSaleServiceDto } from './create-sale-service.dto';

export class UpdateSaleServiceDto extends PartialType(CreateSaleServiceDto) {}
