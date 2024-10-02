import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'coupons' })
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  code: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  valorPorc: number;

  @Column({ default: false})
  used: boolean;

  // relacion muchos-a-uno con User
  @ManyToOne(() => User, (user) => user.coupons)
  @JoinColumn({name:"userId"})
  user: User;
  @Column("uuid")
  userId:string

}
