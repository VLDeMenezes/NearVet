import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Between, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SalesRepository {

    constructor (@InjectRepository(Sale) private saleRepository: Repository<Sale>) {}

    async getSalesByDates (page:number, limit:number, start:Date, end:Date): Promise<Sale[]> {
        return await this.saleRepository.find({where: {date: Between(start,end)}, 
                                               take: limit, skip:(page-1)*limit,
                                               relations: {user:true}});
    }

    async getSales (): Promise<Sale[]> {
        return await this.saleRepository.find();
    }

    async getSaleById (id:string): Promise<Sale> {
        return await this.saleRepository.findOne({where: {id}, relations: {user:true, saleProducts: {product:true}, saleServices: {service:true}}});
    }

    async getSalesByUserId (page:number, limit:number, userId:string, start:Date, end:Date): Promise<Sale[]> {
        return await this.saleRepository.find({
            where: {userId, date: Between(start,end)}, 
            take: limit, 
            skip:(page-1)*limit,
            relations: {user:true, saleServices: {service:true}, saleProducts: {product:true}} 
        });
    }

    async getSalesSendClinical (): Promise<Sale[]> {
        return await this.saleRepository.find({where: {sendClinical:true, finished:false},
                                               relations: {user:true}});
    }
 
    async createSale (sale:Partial<Sale>): Promise<Sale> {
        return await this.saleRepository.save(sale);
    }

    async updateSale (id:string, sale:Partial<Sale>): Promise<UpdateResult> {
        return await this.saleRepository.update(id, sale);
    }

    async deleteSale (id:string): Promise<DeleteResult> {
        return await this.saleRepository.delete(id);
    }
}
