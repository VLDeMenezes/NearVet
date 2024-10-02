import { Module } from '@nestjs/common';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { PrescriptionRepository } from './prescription.repository';
import { SaleProductsRepository } from '../sale-products/sale-products.repository';
import { SaleProduct } from '../sale-products/entities/sale-product.entity';
import { SaleProductsService } from '../sale-products/sale-products.service';
import { SalesRepository } from '../sales/sales.repository';
import { Sale } from '../sales/entities/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription, SaleProduct, Sale])
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService, PrescriptionRepository, SaleProductsRepository, SaleProductsService, SalesRepository]
})
export class PrescriptionModule {}
