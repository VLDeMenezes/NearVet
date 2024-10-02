import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  
  constructor (private readonly productService: ProductsRepository){}

    async getProducts () {
      return await this.productService.getProducts();
    }

    async getProductById (id:string): Promise<Product> {
      const productFind: Product = await this.productService.getProductById(id);
      if (!productFind) throw new NotFoundException("No existe el producto buscado")
      return productFind
    }

    async getProductByName (name:string): Promise<Product> {
      const productFind: Product = await this.productService.getProductById(name);
      if (!productFind) throw new NotFoundException("No existe el producto buscado")
      return productFind
    }

    // async getProductsByCategory (page:number, limit:number, categoryProductId: string): Promise<Product[]> {
    //   const productFind: Product[] = await this.productService.getProductsByCategory(page, limit, categoryProductId);
    //   if (productFind.length===0) throw new NotFoundException("No se encontraron Productos en esta categoria")
    //   return productFind
    // }

    // async getProductsBySale (saleId: string): Promise<Product[]> {
    //     return await this.productRepository.find({where: {saleProduct: {saleId}}})
    //     const productsFind: Product[] = await this.productService.getProductsBySale(saleId);
    //     if (productsFind.length===0) throw new NotFoundException("No se encontraron Productos para la venta")
    //     return productsFind
    // }

    async createProduct (product: Partial<Product>): Promise<Product>{
      const productCreated: Product = await this.productService.createProduct(product);
      if (!productCreated) throw new InternalServerErrorException("No se pudo crear el producto")
      return productCreated
    }

    async updateProduct (id: string, product: Partial<Product>): Promise<string>{
      const productUpdated: UpdateResult = await this.productService.updateProduct(id, product);
      if (productUpdated.affected ===1) throw new NotFoundException("No se encontro el producto a actualizar")
      return id
    }

    async removeProduct (id: string): Promise<string>{
      const productDeleted: DeleteResult = await this.productService.removeProduct(id);
      if (productDeleted.affected ===1) throw new NotFoundException("No se encontro el producto a eliminar")
      return id
    }

}
