import { Module } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { SaleProductsController } from './sale-products.controller';
import { SaleProductsRepository } from './sale-products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProduct } from './entities/sale-product.entity';
import { SalesRepository } from '../sales/sales.repository';
import { Sale } from '../sales/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProduct, Sale])],
  controllers: [SaleProductsController],
  providers: [SaleProductsService, SaleProductsRepository, SalesRepository],
})
export class SaleProductsModule {}
