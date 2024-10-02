import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SaleProductsRepository } from './sale-products.repository';
import { SaleProduct } from './entities/sale-product.entity';
import { SalesRepository } from '../sales/sales.repository';

@Injectable()
export class SaleProductsService {
 
  constructor (private readonly saleProductRepository: SaleProductsRepository,
    private readonly saleRepository: SalesRepository
  ) {}

  async getSalesProducts (): Promise<SaleProduct[]> {
    return await this.saleProductRepository.getSalesProducts()
  }

  async getSalesProductBySaleId (saleId:string): Promise<SaleProduct[]> {
    return await this.saleProductRepository.getSalesProductBySaleId(saleId)
  }

  async createSalesProduct (saleProduct: Partial<SaleProduct>): Promise<SaleProduct> {
    let saleproductFind = await this.saleProductRepository.getSalesProductByIds (saleProduct.saleId, saleProduct.productId)
    if (saleproductFind) {
      await this.saleProductRepository.updateSalesProduct(saleProduct.saleId, saleProduct.productId, {acount: (saleproductFind.acount + saleProduct.acount)});
      await this.saleRepository.updateSale(
        saleProduct.saleId, 
        {subtotal: (saleproductFind.sale.subtotal +(saleProduct.acount*saleProduct.price)), 
         total: (saleproductFind.sale.total +(saleProduct.acount*saleProduct.price))});
      return {...saleproductFind, acount: (saleproductFind.acount + saleProduct.acount)}
    } else {
      const saleProductCreated: SaleProduct = await this.saleProductRepository.createSalesProduct(saleProduct)
      if (!saleProductCreated) throw new InternalServerErrorException("No se pudo agregar el Producto a la venta")
      saleproductFind = await this.saleProductRepository.getSalesProductByIds (saleProduct.saleId, saleProduct.productId)
      await this.saleRepository.updateSale(
        saleProduct.saleId, 
        {subtotal: (saleproductFind.sale.subtotal +(saleProduct.acount*saleProduct.price)), 
         total: (saleproductFind.sale.total +(saleProduct.acount*saleProduct.price))});
      return saleProductCreated
    }
  }

  async updateSalesProduct (saleId:string, productId:string, saleProduct: Partial<SaleProduct>): Promise<string[]> {
    const saleProductUpdate: UpdateResult = await this.saleProductRepository.updateSalesProduct(saleId, productId, saleProduct)
    if (saleProductUpdate.affected === 0) throw new NotFoundException("No se encontro el Producto a actualizar")
    return [saleId, productId]
  }

  async deleteSalesProduct (saleId:string, productId:string): Promise<string[]> {
    const saleProductDelete: DeleteResult = await this.saleProductRepository.deleteSalesProduct(saleId, productId)
    if (saleProductDelete.affected === 0) throw new NotFoundException("No se encontro el Producto a eliminar")
    return [saleId, productId]
  }

}
