import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceRepository } from './service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CategoryServiceRepository } from '../categoryServices/categoryServices.repository';
import { VeterinarianRepository } from '../veterinarian/veterinarian.repository';
import { CategoryService } from '../categoryServices/entities/categoryService.entity';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, CategoryService, Veterinarian])],
  controllers: [ServicesController],
  providers: [ServicesService, ServiceRepository, CategoryServiceRepository, VeterinarianRepository],
  exports: [ServiceRepository],
})
export class ServicesModule {}
