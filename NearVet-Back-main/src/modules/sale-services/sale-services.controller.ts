import { Controller, Get, Post, Body, Param, Delete, Query, Put, ParseUUIDPipe } from '@nestjs/common';
import { SaleServicesService } from './sale-services.service';
import { CreateSaleServiceDto } from './dto/create-sale-service.dto';
import { UpdateSaleServiceDto } from './dto/update-sale-service.dto';
import { SaleService } from './entities/sale-service.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Sales Services")
@Controller('sale-services')
export class SaleServicesController {
  constructor(private readonly saleServicesService: SaleServicesService) {}

  @Get()
  async getSalesServices (): Promise<SaleService[]> {
    return await this.saleServicesService.getSalesServices()
  }
  
  @Get(":saleId")
  async getSalesServiceBySaleId (@Param("saleId", ParseUUIDPipe) saleId:string): Promise<SaleService[]> {
    return await this.saleServicesService.getSalesServiceBySaleId(saleId)
  }

  @Post()
  async createSalesService (@Body() saleService: CreateSaleServiceDto): Promise<SaleService> {
    return await this.saleServicesService.createSalesService(saleService)
  }

  @Put()
  async updateSalesService (@Query("saleId", ParseUUIDPipe) saleId:string, 
                            @Query("serviceId", ParseUUIDPipe) serviceId:string, 
                            @Body() saleService: UpdateSaleServiceDto): Promise<string[]> {
    return await this.saleServicesService.updateSalesService(saleId, serviceId, saleService)
  }

  @Delete()
  async deleteSalesService (@Query("saleId", ParseUUIDPipe) saleId:string, 
                            @Query("serviceId", ParseUUIDPipe) serviceId:string): Promise<string[]> {
    return await this.saleServicesService.deleteSalesService(saleId, serviceId)
  }
}
