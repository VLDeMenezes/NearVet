import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { User } from "./user.entity";

@Entity({name: "roles"})
export class UserRole {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({length:50, nullable:false})
    role: string

    @ManyToMany(() => User, user => user.userRoles)
    @JoinTable({
        name: 'userRoles',
        joinColumn: {
        name: 'userRoleid',
        referencedColumnName: 'id'
        },
        inverseJoinColumn: {
        name: 'userid',
        referencedColumnName: 'id'
        }
    })
    users: User[];
}