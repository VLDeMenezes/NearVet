import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";

@Entity({
    name: 'CITIES',
})
export class Cities {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string;

    /* RELACION UNO-A-MUCHOS CON users */
    @OneToMany(() => Users, (user) => user.city)
    users: Users[];
    /* RELACION UNO-A-MUCHOS CON vets */

    /* RELACION MUCHOS-A-UNO provincia-ciudad */

}