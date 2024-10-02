import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleService } from './entities/sale-service.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SaleServicesRepository {

    constructor (@InjectRepository(SaleService) private saleServiceRepository: Repository<SaleService>) {}

    async getSalesServices (): Promise<SaleService[]> {
        return await this.saleServiceRepository.find()
      }

    async getSalesServiceBySaleId (saleId:string): Promise<SaleService[]> {
        return await this.saleServiceRepository.find({
            where: {saleId},
            relations: {service:true}
        })
    }

    async getSalesServiceByIds (saleId:string, serviceId:string): Promise<SaleService> {
        return await this.saleServiceRepository.findOne({
            where: {saleId, serviceId},
            relations: {service:true, sale:true}
        })
    }

    async createSalesService (saleService: Partial<SaleService>): Promise<SaleService> {
        return await this.saleServiceRepository.save(saleService)
    }

    async updateSalesService (saleId:string, serviceId:string, saleService: Partial<SaleService>): Promise<UpdateResult> {
        return await this.saleServiceRepository.update({saleId, serviceId}, saleService)
    }

    async deleteSalesService (saleId:string, serviceId:string): Promise<DeleteResult> {
        return await this.saleServiceRepository.delete({saleId, serviceId})
    }


}
