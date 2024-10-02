import { Module } from '@nestjs/common';
import { SaleServicesService } from './sale-services.service';
import { SaleServicesController } from './sale-services.controller';
import { SaleService } from './entities/sale-service.entity';
import { SaleServicesRepository } from './sale-services.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesRepository } from '../sales/sales.repository';
import { Sale } from '../sales/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleService, Sale])],
  controllers: [SaleServicesController],
  providers: [SaleServicesService, SaleServicesRepository, SalesRepository],
})
export class SaleServicesModule {}
