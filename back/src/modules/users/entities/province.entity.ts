import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity({
    name: 'PROVINCES',
})
export class Provinces {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    province: string;

    /* RELACION UNO-A-MUCHOS CON users */
    @OneToMany(() => Users, (user) => user.province)
    users: Users[];

    /* RELACION UNO-A-MUCHOS CON vets */

    /* RELACION UNO-A-MUCHOS provincia-ciudad */
}