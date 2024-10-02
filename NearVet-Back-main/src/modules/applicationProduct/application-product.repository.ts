import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationProduct } from './entities/applicationProduct.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
 
@Injectable()
export class ApplicationProductRepository {

    constructor (@InjectRepository(ApplicationProduct) private AppProductRepository: Repository<ApplicationProduct>){}

    async getApplicationProductByTreatmentId(treatmentId:string): Promise<ApplicationProduct[]> {
        return await this.AppProductRepository.find({where: {treatmentId}, relations: {product:true}});
    }

    async createApplicationProduct(AppProd: Partial<ApplicationProduct>): Promise<ApplicationProduct> {
        return await this.AppProductRepository.save(AppProd);
    }
      
    async updateApplicationProduct(treatmentId: string, productId: string, AppProd: Partial<ApplicationProduct>): Promise<UpdateResult> {
        return await this.AppProductRepository.update({treatmentId, productId}, AppProd)
    } 
  
    async removeApplicationProduct(treatmentId: string, productId: string): Promise<DeleteResult> {
        return await this.AppProductRepository.delete({treatmentId, productId})
    }

    async removeApplicationProductByTreatment(treatmentId: string): Promise<DeleteResult> {
        return await this.AppProductRepository.delete(treatmentId)
    }
    
}
