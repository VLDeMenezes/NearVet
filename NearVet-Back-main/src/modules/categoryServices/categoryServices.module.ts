import { Module } from '@nestjs/common';
import { CategoryServicesService } from './categoryServices.service';
import { CategoryServicesController } from './categoryServices.controller';
import { CategoryServiceRepository } from './categoryServices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './entities/categoryService.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryService])],
  controllers: [CategoryServicesController],
  providers: [CategoryServicesService, CategoryServiceRepository],
})
export class CategoryServicesModule {}
