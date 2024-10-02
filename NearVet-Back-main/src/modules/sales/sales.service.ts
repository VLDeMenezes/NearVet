import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { Sale } from './entities/sale.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class SalesService {

  constructor (private readonly saleRepository: SalesRepository) {}

  async getSalesByDates (page:number, limit:number, start:Date, end:Date) {
    return await this.saleRepository.getSalesByDates (page, limit, start, end);
  }

  async getSales (): Promise<Sale[]> {
    return await this.saleRepository.getSales ();
  }

  async getSaleById (id:string): Promise<Sale> {
    const sale: Sale = await this.saleRepository.getSaleById (id)
    if (!sale ) throw new NotFoundException("No se encontraro la venta")
    return sale;
  }

  async getSalesByUserId (page:number, limit:number, userId:string, start:Date, end:Date) {
    return await this.saleRepository.getSalesByUserId (page, limit, userId, start, end);
  }

  async getSalesSendClinical () {
    return await this.saleRepository.getSalesSendClinical ();
  }

  async createSale (sale:Partial<Sale>): Promise<Sale> {
    const saleCreated: Sale = await this.saleRepository.createSale(sale);
    if (!saleCreated ) throw new InternalServerErrorException("No se pudo crear la venta")
    return saleCreated; 
  }

  async updateSale (id:string, sale:Partial<Sale>): Promise<Sale> {
    const saleUpdate: UpdateResult = await this.saleRepository.updateSale(id, {...sale, finished:true});  
    if (saleUpdate.affected === 0) throw new NotFoundException("No se encontro la venta a actualizar")
    return await this.getSaleById(id);
  }

  async deleteSale (id:string): Promise<string> {
    const saleDelete: DeleteResult = await this.saleRepository.deleteSale(id)
    if (saleDelete.affected === 0) throw new NotFoundException("No se encontro la venta a eliminar")
    return id;
  }
}
