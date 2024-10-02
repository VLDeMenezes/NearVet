import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationProduct } from 'src/modules/applicationProduct/entities/applicationProduct.entity';
import { SaleProduct } from 'src/modules/sale-products/entities/sale-product.entity';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';

@Entity({
  name: 'products',
})
export class Product {
 
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column({type:"varchar", nullable:false})
  name:string

  @Column({type:"varchar", nullable:true})
  description:string

  @Column({type:"varchar", nullable:true})
  image:string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  cost: number;

  @Column({nullable: false })
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  // RELACION UNO-A-MUCHOS con applicationProduct
  @OneToMany(() => ApplicationProduct, (applicationProduct) => applicationProduct.product)
  applicationProducts: ApplicationProduct[];

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.product)
    saleProducts: SaleProduct[];

  @OneToMany(() => Prescription, (prescription) => prescription.product)
  prescriptions: Prescription[];

  // /* RELACION MUCHOS-A-UNO CON CategoryService */
  // @ManyToOne(() => CategoryProduct, (categoryProduct) => categoryProduct.products)
  // @JoinColumn({ name: 'categoryProductId' })
  // categoryProduct: CategoryProduct;
  // @Column({type: 'uuid',nullable: true})
  // categoryProductId: string;

  // Relación UNO-A-MUCHOS con Prescription

}