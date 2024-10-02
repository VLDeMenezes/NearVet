import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsRepository {
  
  constructor (@InjectRepository(Product) private productRepository: Repository<Product>){}

    async getProducts (): Promise<Product[]> {
        return await this.productRepository.find()
    }

    async getProductById (id:string): Promise<Product> {
        return await this.productRepository.findOne({where: {id}})
    }

    async getProductByName (name:string): Promise<Product> {
        return await this.productRepository.findOne({where: {name}})
    }

    // async getProductsByCategory (page:number, limit:number, categoryProductId: string): Promise<Product[]> {
    //     return await this.productRepository.find({skip: page*limit, take: limit, 
    //                                               where: {categoryProductId},
    //                                               relations: {categoryProduct:true}})
    // }

    // async getProductsBySale (saleId: string): Promise<Product[]> {
    //     return await this.productRepository.find({where: {saleProduct: {saleId}}})
    // }

    async createProduct (product: Partial<Product>): Promise<Product>{
        return await this.productRepository.save(product);
    }

    async updateProduct (id: string, product: Partial<Product>): Promise<UpdateResult>{
        return await this.productRepository.update(id, product);
    }

    async removeProduct (id: string): Promise<DeleteResult>{
        return await this.productRepository.delete(id);
    }

}
