import { Controller, Get, Post, Body, Param, Delete, HttpCode, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { CategoryServicesService } from './categoryServices.service';
import { CreateCategoryServiceDto } from './dto/createCategoryService.dto';
import { UpdateCategoryServiceDto } from './dto/updateCategoryService.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './entities/categoryService.entity';

@ApiTags("Categories Services")
@Controller('category-services')
export class CategoryServicesController {
  constructor(private readonly categoryServicesService: CategoryServicesService) {}

  @Get()
  @ApiOperation({summary: 'Retorna todos los datos de todas las categorias de servicios'})
  @HttpCode(200)
  async getCategoryServices(): Promise<CategoryService[]> {
    return await this.categoryServicesService.getCategoryServices();
  }

  @Get('category/:cat')
  @ApiOperation({summary: 'Retorna todos los datos de la categoria de servicio requerida por categoria'})
  @HttpCode(200)
  async getCategoryServiceByCategory(@Param('cat') cat: string): Promise<CategoryService> {
    return await this.categoryServicesService.getCategoryServiceByCategory(cat);
  }

  @Get(':id')
  @ApiOperation({summary: 'Retorna todos los datos de la categoria de servicio requerida por ID'})
  @HttpCode(200)
  async getCategoryServiceById(@Param('id', ParseUUIDPipe) id: string): Promise<CategoryService> {
    return await this.categoryServicesService.getCategoryServiceById(id);
  }
  
  @Post()
  @ApiOperation({summary: 'Registra una categoria de servicio nueva'})
  @ApiBody({ description: 'Ingesar los datos de la categoria de servicio', type: CreateCategoryServiceDto })
  @HttpCode(201)
  createCategoryService(@Body() createCategoryService: CreateCategoryServiceDto):Promise<CategoryService> {
    return this.categoryServicesService.createCategoryService(createCategoryService);
  }

  @Put(':id')
  @ApiOperation({summary: 'Actualiza Datos de una categoria de serivcio especifica'})
  @HttpCode(200)
  updateCategoryService(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryService: UpdateCategoryServiceDto): Promise<string> {
    return this.categoryServicesService.updateCategoryService(id, updateCategoryService);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Elimina una categoria de serivcio pasado por ID'})
  @HttpCode(200)
  removeCategoryService(@Param('id') id: string) {
    return this.categoryServicesService.removeCategoryService(id);
  }
 
}
