import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryServiceDto } from './createCategoryService.dto';

export class UpdateCategoryServiceDto extends PartialType(CreateCategoryServiceDto) {}
