import { Sale } from "src/modules/sales/entities/sale.entity";
import { Service } from "src/modules/services/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({
    name: "saleServies"
})
export class SaleService {
    
    @ManyToOne (() => Service, (service) => service.saleServices)
    @JoinColumn({name:"serviceId"})
    service: Service

    @PrimaryColumn("uuid")
    serviceId: string;

    @ManyToOne (() => Sale, (sale) => sale.saleServices, {onDelete: "CASCADE"})
    @JoinColumn({name:"saleId"})
    sale: Sale
    
    @PrimaryColumn("uuid")
    saleId: string;

    @Column()
    price: number;

    @Column()
    acount: number;
}
