import { Sale } from "src/modules/sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"methodsPay"
})
export class MethodPay {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
    })
    method: string;
    
    @Column({
    nullable: true
    })
    interest: number;

    // Relacion con Sales uno a muchos
    @OneToMany(() => Sale, (sale) => sale.methodPay)
    sales: Sale[];

}
