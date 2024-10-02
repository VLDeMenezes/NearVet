import { Product } from "src/modules/products/entities/product.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({
    name: "saleProducts"
})
export class SaleProduct {
    
    @ManyToOne (() => Product, (product) => product.saleProducts)
    @JoinColumn({name:"productId"})
    product: Product
    @PrimaryColumn("uuid")
    productId: string;

    @ManyToOne (() => Sale, (sale) => sale.saleProducts, {onDelete: "CASCADE"})
    @JoinColumn({name:"saleId"})
    sale: Sale
    @PrimaryColumn("uuid")
    saleId: string;

    @Column({type:"float"})
    price: number;

    @Column()
    acount: number;
}