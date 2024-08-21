import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { UserRole } from "./userRole.entity";

@Entity({name: "users"})
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({length:50, nullable:false})
    name: string

    @Column({length:50, nullable:false})
    lastname: string

    @Column({length:50, nullable:false, unique:true})
    email: string
 
    @Column({nullable:false})
    password: string 

    @Column({type: Date, nullable:true})
    birthdate: Date;

    @Column({type: Date, nullable:true})
    startDate: Date;

    @Column({type: Date, nullable:true})
    endDate: Date;

    @Column("int")
    phone: number 

    @Column()
    address: string

    @Column({length:50})
    city: string

    @Column({length:50})
    province: string

    @Column({length:50})
    zipCode: string

    @ManyToMany(() => UserRole, userRole => userRole.users)
    userRoles: UserRole[];
}