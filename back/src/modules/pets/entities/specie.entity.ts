import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pets } from "./pet.entity";


@Entity({
    name: 'SPECIES',
})
export class Species {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    specie: string;

    /* RELACION UNO-A-MUCHOS CON pets */
    @OneToMany(() => Pets, (pet) => pet.species)
    pets: Pets[];

    /* RELACION MUCHOS-A-UNO CON races */

    
}