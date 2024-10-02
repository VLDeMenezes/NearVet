import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  
  constructor(private readonly productsService: ProductsService) {}
 
  @Get()
  @ApiOperation({summary: "Devuelve todos los productos paginados"})
  async getProducts (): Promise<Product[]> {
    return await this.productsService.getProducts() 
  }

  @Get("name/:name")
  @ApiOperation({summary: "Devuelve un producto pasado por Nombre"})
  async getProductByName (@Param("name") name:string): Promise<Product> {
      return await this.productsService.getProductByName(name)
  }

  @Get(":id")
  @ApiOperation({summary: "Devuelve un producto pasado por ID"})
  async getProductById (@Param("id", ParseUUIDPipe) id:string): Promise<Product> {
      return await this.productsService.getProductById(id)
  }

  @Post()
  @ApiOperation({summary: "Crea un nuevo Producto"})
  async createProduct (product: CreateProductDto): Promise<Product> {
      return await this.productsService.createProduct(product);
  }

  @Put(":id")
  @ApiOperation({summary: "Actualiza un producto"})
  @ApiBody({ description:"Ingrese los datos a actualizar", type:UpdateProductDto})
  async updateProduct (@Param("id", ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string>{
      return await this.productsService.updateProduct(id, product);
  }

  @Delete(":id")
  @ApiOperation({summary: "Elimina un producto"})
  async removeProduct (id: string): Promise<string>{
      return await this.productsService.removeProduct(id);
  }
}
