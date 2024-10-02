import { ClinicalExamination } from "src/modules/clinical-examination/entities/clinicalExamination.entity";
import { MethodPay } from "src/modules/method-pay/entities/method-pay.entity";
import { SaleProduct } from "src/modules/sale-products/entities/sale-product.entity";
import { SaleService } from "src/modules/sale-services/entities/sale-service.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"sales"
})
export class Sale {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default:0})
    subtotal: number

    @Column({default:0})
    discount: number

    @Column({default:0})
    total: number

    @Column({type:"date"})
    date: Date

    @Column({default:0})
    advancedPay: number

    @Column({default:false})
    finished: boolean

    @Column({default:true})
    sendClinical: boolean

    //Realcion con User Muchos a uno
    @ManyToOne(() => User, (user) => user.sales)
    @JoinColumn({name: "userId"})
    user: User;
    @Column("uuid")
    userId: string

    //Relacion con MethodPay 
    @ManyToOne(() => MethodPay, (methodPay) => methodPay.sales)
    @JoinColumn({name: "methodPayId"})
    methodPay: MethodPay;
    @Column({type:"uuid", nullable: true})
    methodPayId: string

    @OneToMany(() => SaleService, (saleService) => saleService.sale, {cascade:true})
    saleServices: SaleService[];

    @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale, {cascade:true})
    saleProducts: SaleProduct[];

    @OneToOne(() => ClinicalExamination, (clinicalExamination) => clinicalExamination.sale,)
    clinicalExamination: ClinicalExamination;

}
