import { 
    Column, 
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
 } from "typeorm";
import { Species } from "./specie.entity";



@Entity({
    name: 'PETS',
})
export class Pets {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    birthdate: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    startDate: string;
    
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    endDate: string;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
    })
    color: string;


    /* RELACION MUCHOS-A-UNO CON usuarios */
    @ManyToOne(() => Provinces, (province) => province.users)
    province: Provinces;

    /* RELACION MUCHOS-A-UNO CON especie */
    @ManyToOne(() => Species, (specie) => specie.pets)
    specie: Species;

    /* RELACION MUCHOS-A-UNO CON raza */
    @ManyToOne(() => Cities, (city) => city.users)
    city: Cities;

    /* RELACION MUCHOS-A-UNO CON sexo */
    @ManyToOne(() => Cities, (city) => city.users)
    city: Cities;

}