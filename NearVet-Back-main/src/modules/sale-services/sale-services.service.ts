import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SaleServicesRepository } from './sale-services.repository';
import { SaleService } from './entities/sale-service.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SalesRepository } from '../sales/sales.repository';

@Injectable()
export class SaleServicesService {
 
  constructor (private readonly saleServiceRepository: SaleServicesRepository,
    private readonly saleRepository: SalesRepository
  ) {}

  async getSalesServices (): Promise<SaleService[]> {
    return await this.saleServiceRepository.getSalesServices()
  }

  async getSalesServiceBySaleId (saleId:string): Promise<SaleService[]> {
    return await this.saleServiceRepository.getSalesServiceBySaleId(saleId)
  }

  async createSalesService (saleService: Partial<SaleService>): Promise<SaleService> {
    let saleServiceFind = await this.saleServiceRepository.getSalesServiceByIds(saleService.saleId, saleService.serviceId)
    if (saleServiceFind) throw new BadRequestException("El servicio ya fue creado para esta examinacion. No puede asignar dos veces el mismo servicio")
    const saleServiceCreated: SaleService = await this.saleServiceRepository.createSalesService(saleService)
    if (!saleServiceCreated) throw new InternalServerErrorException("No se pudo agregar el servicio a la venta")
    saleServiceFind = await this.saleServiceRepository.getSalesServiceByIds(saleService.saleId, saleService.serviceId)
    await this.saleRepository.updateSale(
      saleService.saleId, 
      {subtotal: (saleServiceFind.sale.subtotal +(saleService.acount*saleService.price)), 
       total: (saleServiceFind.sale.total +(saleService.acount*saleService.price))});
    return saleServiceCreated
  }

  async updateSalesService (saleId:string, serviceId:string, saleService: Partial<SaleService>): Promise<string[]> {
    const saleServiceUpdate: UpdateResult = await this.saleServiceRepository.updateSalesService(saleId, serviceId, saleService)
    if (saleServiceUpdate.affected === 0) throw new NotFoundException("No se encontro el servicio a actualizar")
    return [saleId, serviceId]
  }

  async deleteSalesService (saleId:string, serviceId:string): Promise<string[]> {
    const saleServiceDelete: DeleteResult = await this.saleServiceRepository.deleteSalesService(saleId, serviceId)
    if (saleServiceDelete.affected === 0) throw new NotFoundException("No se encontro el servicio a eliminar")
    return [saleId, serviceId]
  }

}
