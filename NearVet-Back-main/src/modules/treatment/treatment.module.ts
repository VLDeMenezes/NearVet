import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './entities/treatment.entity';
import { TreatmentRepository } from './treatment.repository';
import { SaleServicesRepository } from '../sale-services/sale-services.repository';
import { SaleService } from '../sale-services/entities/sale-service.entity';
import { SaleServicesService } from '../sale-services/sale-services.service';
import { SalesRepository } from '../sales/sales.repository';
import { Sale } from '../sales/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment, SaleService, Sale])],
  controllers: [TreatmentController],
  providers: [TreatmentService, TreatmentRepository, SaleServicesRepository, SaleServicesService, SalesRepository],
})
export class TreatmentModule {}
