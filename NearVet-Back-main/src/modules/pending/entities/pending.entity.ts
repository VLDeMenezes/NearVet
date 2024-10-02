import { Pet } from 'src/modules/pets/entities/pet.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('pendings')
export class Pending {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'timestamp',
  })
  date: Date;

  @Column({
    type: 'timestamp',
  })
  endPending: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  notification: boolean;

  /* RELACION MUCHOS-A-UNO CON services */
  @ManyToOne(() => Service, (service) => service.pendings)
  @JoinColumn({name: "serviceId"})
  service: Service;
  @Column({ type:"uuid"})
  serviceId:string;

  /* RELACION MUCHOS-A-UNO CON pets */
  @ManyToOne(() => Pet, (pet) => pet.pendings, { onDelete: "CASCADE"})
  @JoinColumn({name: "petId"})
  pet: Pet;
  @Column({ type:"uuid"})
  petId: string;

}
