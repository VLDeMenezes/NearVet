import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Put, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationProductService } from './application-product.service';
import { CreateApplicationProductDto } from './dto/createApplicationProduct.dto';
import { UpdateApplicationProductDto } from './dto/updateApplicationProduct.dto';
import { ApplicationProduct } from './entities/applicationProduct.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Applications Products to Treatment")
@Controller('application-product')
export class ApplicationProductController {

  constructor(private readonly applicationProductService: ApplicationProductService) {}

  @Get(":treatmentId")
  @ApiOperation({summary: 'Productos aplicados a un tratamiento'})
  async getApplicationProductByTreatmentId(@Param("treatmentId", ParseUUIDPipe) treatmentId:string): Promise<ApplicationProduct[]> {
    return await this.applicationProductService.getApplicationProductByTreatmentId(treatmentId);
  }

  @Post()
  @ApiOperation({summary: "Ingresa un nuevo producto aplicado a un tratamiento"})
  async createApplicationProduct(@Body() AppProd: CreateApplicationProductDto): Promise<ApplicationProduct> {
      return await this.applicationProductService.createApplicationProduct(AppProd);
  }

  @Put()
  @ApiOperation({summary: "Actualiza cantidad o precio de un producto agregado a un tratamiento"})
  async updateApplicationProduct(@Query("treatmentId", ParseUUIDPipe) treatmentId: string, 
                                 @Query("productId", ParseUUIDPipe) productId: string, 
                                 @Body() AppProd: UpdateApplicationProductDto): Promise<Object> {
      return await this.applicationProductService.updateApplicationProduct(treatmentId, productId, AppProd)
  } 

  @Delete()
  @ApiOperation({summary: "Elimina un producto de un tratamiento"})
  async removeApplicationProduct(@Query("treatmentId", ParseUUIDPipe) treatmentId: string,
                                 @Query("productId", ParseUUIDPipe)  productId: string): Promise<Object> {
      return await this.applicationProductService.removeApplicationProduct(treatmentId, productId)
  }

  @Delete(":treatmentId")
  @ApiOperation({summary: "Elimina todos los productos relacionados a un tratamiento"})
  async removeApplicationProductByTreatment(@Param("treatmentId", ParseUUIDPipe) treatmentId: string): Promise<string> {
      return await this.applicationProductService.removeApplicationProductByTreatment(treatmentId)
  }
}
