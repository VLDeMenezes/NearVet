import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from 'src/modules/pets/entities/pet.entity';
import { UserRole } from './userRole.entity';
import { Vet } from 'src/modules/vets/entities/vet.entity';
import { Veterinarian } from 'src/modules/veterinarian/entities/veterinarian.entity';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import { Pending } from 'src/modules/pending/entities/pending.entity';
import { Coupon } from 'src/modules/coupons/entities/coupon.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default:
      'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
  })
  imgProfile: string;

  @Column({
    nullable: true,
    unique: true,
  })
  dni: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endDate: Date;

  @Column({
    nullable: true,
  })
  phone: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  city: string;

  /* RELACION UNO-A-MUCHOS con pets */
  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  /* RELACION UNO-A-MUCHOS con sales */
  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  //RELACION UNO-A-MUCHOS con roles
  @ManyToOne(() => UserRole, (role) => role.users)
  @JoinColumn({name:"roleId"})
  role: UserRole; 

  @Column({
    type: 'varchar',
    nullable: false,
  })
  roleId: string;

  //RELACION UNO-A-UNO con Veterinarian
  @OneToOne(() => Veterinarian, (veterinarian) => veterinarian.user)
  veterinarian: Veterinarian;

  @OneToOne(() => Vet, (vet) => vet.user)
  vet: Vet;

  // @OneToMany(() => Pending, (pending) => pending.user) // Relación One-to-Many con la entidad Pending
  // pendings: Pending[]; // Nombre de la propiedad que corresponde a la relación inversa

  @OneToMany(() => Coupon, (coupon) => coupon.user) // Relación One-to-Many con la entidad Pending
  coupons: Coupon[];
}
