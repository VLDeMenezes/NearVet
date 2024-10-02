import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Treatment } from 'src/modules/treatment/entities/treatment.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity({
  name: 'applicationsProducts',
})
export class ApplicationProduct {

  @Column({nullable: false })
  acount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  // RELACION UNO-A-MUCHOS con treatament
  @ManyToOne(() => Treatment, (treatament) => treatament.applicationProducts)
  @JoinColumn({name:"treatmentId"})
  treatment: Treatment;
  @PrimaryColumn("uuid")
  treatmentId:string

  // RELACION UNO-A-MUCHOS con product
  @ManyToOne(() => Product, (product) => product.applicationProducts)
  @JoinColumn({name:"productId"}) 
  product: Product;
  @PrimaryColumn("uuid")
  productId:string
}

