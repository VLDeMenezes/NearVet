import { User } from './user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/roles.enum';

@Entity({ name: 'userRoles' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  role: Role;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
