import { Pet } from "src/modules/pets/entities/pet.entity";
import { Prescription } from "src/modules/prescription/entities/prescription.entity";
import { Treatment } from "src/modules/treatment/entities/treatment.entity";
import { Veterinarian } from "src/modules/veterinarian/entities/veterinarian.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { FileTreatment } from "src/modules/fileTraetment/entities/file-treatment.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";

@Entity({
  name: 'clinicalExaminations',
}) 
export class ClinicalExamination {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: false })
  anamnesis: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  diagnosis: string;

  @Column({ nullable: true })
  fc: number;

  @Column({ nullable: true })
  fr: number;

  @Column({ type: "varchar", length: 30, nullable: true })
  mucous: string;

  @Column({ nullable: true })
  tllc: number;

  @Column({ type: "float", nullable: true })
  temperature: number;

  @Column({ nullable: true })
  hydration: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  moodState: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  temper: string;

  @Column({ type: "date", nullable: false })
  date: Date;

  @OneToMany(() => Treatment, (treatment) => treatment.clinicalExamination, { cascade: true })
  treatments: Treatment[];

  @ManyToOne(() => Pet, (pet) => pet.clinicalExaminations)
  @JoinColumn({ name: "petId" })
  pet: Pet;
  @Column("uuid")
  petId: string;

  @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.clinicalExaminations)
  @JoinColumn({ name: "veterinarianId" })
  veterinarian: Veterinarian;
  @Column("uuid")
  veterinarianId: string;

  @OneToOne(() => Sale, (sale) => sale.clinicalExamination)
  @JoinColumn({ name: "saleId" })
  sale: Sale;
  @Column({type: "uuid", nullable:true})
  saleId: string;

  @OneToMany(() => Prescription, (prescription) => prescription.clinicalExamination)
  prescriptions: Prescription[];

  @OneToMany(() => FileTreatment, (fileTreatment) => fileTreatment.clinicalExamination)
  fileTreatments: FileTreatment[];
}
