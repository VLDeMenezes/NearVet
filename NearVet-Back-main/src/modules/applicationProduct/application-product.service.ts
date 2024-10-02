import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApplicationProduct } from './entities/applicationProduct.entity';
import { ApplicationProductRepository } from './application-product.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SaleProductsRepository } from '../sale-products/sale-products.repository';
import { TreatmentRepository } from '../treatment/treatment.repository';
import { SaleProductsService } from '../sale-products/sale-products.service';
 
@Injectable()
export class ApplicationProductService {
  
  constructor (private readonly AppProductRepository: ApplicationProductRepository,
               private readonly saleProductService: SaleProductsService,
               private readonly treatmentRepository: TreatmentRepository
  ){}

  async getApplicationProductByTreatmentId(treatmentId:string): Promise<ApplicationProduct[]> {
    const appProduct: ApplicationProduct[] = await this.AppProductRepository.getApplicationProductByTreatmentId(treatmentId);
    return appProduct;
  }

  async createApplicationProduct(appProd: Partial<ApplicationProduct>): Promise<ApplicationProduct> {
    const appProduct: ApplicationProduct = await this.AppProductRepository.createApplicationProduct(appProd)
    if (!appProduct) throw new InternalServerErrorException ("No se pudo asignar el producto al tratamiento")
    const saleId: string = await this.treatmentRepository.getSaleIdByTreatmentId(appProd.treatmentId);
    await this.saleProductService.createSalesProduct({saleId, productId: appProd.productId, price: appProd.price, acount: appProd.acount});
    return appProduct;
  }
    
  async updateApplicationProduct(treatmentId: string, productId: string, AppProd: Partial<ApplicationProduct>): Promise<Object> {
    const appProduct: UpdateResult = await this.AppProductRepository.updateApplicationProduct(treatmentId, productId, AppProd)
    if (appProduct.affected === 0) throw new NotFoundException("No se encontro el producto a actualizar")
    return {treatmentId: treatmentId, productId: productId}
  } 
 
  async removeApplicationProduct(treatmentId: string, productId: string): Promise<Object> {
    const appProduct: DeleteResult = await this.AppProductRepository.removeApplicationProduct(treatmentId, productId)
    if (appProduct.affected === 0) throw new NotFoundException("No se encontro el producto a eliminar")
    return {treatmentId: treatmentId, productId: productId}
  }

  async removeApplicationProductByTreatment(treatmentId: string): Promise<string> {
    const appProduct: DeleteResult = await this.AppProductRepository.removeApplicationProductByTreatment(treatmentId)
    if (appProduct.affected === 0) throw new NotFoundException("No se encontro el producto a eliminar")
    return treatmentId
  }
  
}
