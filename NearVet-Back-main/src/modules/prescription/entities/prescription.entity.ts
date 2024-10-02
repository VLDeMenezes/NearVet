import { ClinicalExamination } from 'src/modules/clinical-examination/entities/clinicalExamination.entity';
import { Pet } from 'src/modules/pets/entities/pet.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  // Relación MUCHOS-A-UNO con Product
  @ManyToOne(() => Product, (product) => product.prescriptions)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'uuid', nullable: true })
  productId: string;

  // Relación MUCHOS-A-UNO con ClinicalExamination
  @ManyToOne(() => ClinicalExamination, (clinicalExamination) => clinicalExamination.prescriptions)
  @JoinColumn({ name: 'clinicalExaminationId' })
  clinicalExamination: ClinicalExamination;

  @Column({ type: 'uuid', nullable: true })
  clinicalExaminationId: string;

}
