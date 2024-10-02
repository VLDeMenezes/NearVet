import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SaleProduct } from './entities/sale-product.entity';

@Injectable()
export class SaleProductsRepository {

    constructor (@InjectRepository(SaleProduct) private saleProductRepository: Repository<SaleProduct>) {}

    async getSalesProducts (): Promise<SaleProduct[]> {
        return await this.saleProductRepository.find()
      }

    async getSalesProductBySaleId (saleId:string): Promise<SaleProduct[]> {
        return await this.saleProductRepository.find({
            where: {saleId},
            relations: {product:true}
        })
    }
    async getSalesProductByIds (saleId:string, productId:string): Promise<SaleProduct> {
        return await this.saleProductRepository.findOne({
            where: {saleId, productId},
            relations: {product:true, sale:true}
        })
    }
    async createSalesProduct (saleProduct: Partial<SaleProduct>): Promise<SaleProduct> {
        return await this.saleProductRepository.save(saleProduct)
    }

    async updateSalesProduct (saleId:string, productId:string, saleProduct: Partial<SaleProduct>): Promise<UpdateResult> {
        return await this.saleProductRepository.update({saleId, productId}, saleProduct)
    }

    async deleteSalesProduct (saleId:string, productId:string): Promise<DeleteResult> {
        return await this.saleProductRepository.delete({saleId, productId})
    }


}
