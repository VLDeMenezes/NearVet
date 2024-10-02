import { Controller, Get, Post, Body, Param, Delete, Query, Put, ParseUUIDPipe } from '@nestjs/common';
import { SaleProductsService } from './sale-products.service';
import { SaleProduct } from './entities/sale-product.entity';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Sales Products")
@Controller('sale-Products')
export class SaleProductsController {
  constructor(private readonly saleProductsService: SaleProductsService) {}

  @Get()
  @ApiOperation({summary: 'Todos los productos en todas las ventas'})
  async getSalesProducts (): Promise<SaleProduct[]> {
    return await this.saleProductsService.getSalesProducts()
  }
  
  @Get(":saleId")
  async getSalesProductBySaleId (@Param("saleId", ParseUUIDPipe) saleId:string): Promise<SaleProduct[]> {
    return await this.saleProductsService.getSalesProductBySaleId(saleId)
  }

  @Post()
  async createSalesProduct (@Body() saleProduct: CreateSaleProductDto): Promise<SaleProduct> {
    return await this.saleProductsService.createSalesProduct(saleProduct)
  }

  @Put()
  async updateSalesProduct (@Query("saleId", ParseUUIDPipe) saleId:string, 
                            @Query("productId", ParseUUIDPipe) productId:string, 
                            @Body() saleProduct: UpdateSaleProductDto): Promise<string[]> {
    return await this.saleProductsService.updateSalesProduct(saleId, productId, saleProduct)
  }

  @Delete()
  async deleteSalesService (@Query("saleId", ParseUUIDPipe) saleId:string, 
                            @Query("serviceId", ParseUUIDPipe) productId:string): Promise<string[]> {
    return await this.saleProductsService.deleteSalesProduct(saleId, productId)
  }
}
