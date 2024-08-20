import { 
    Column, 
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
 } from "typeorm";
import { Provinces } from "./province.entity";
import { Cities } from "./citie.entity";


@Entity({
    name: 'USERS',
})
export class Users {
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
    lastName: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: false,
    })
    password: string;


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
        type: 'int',
    })
    phone: number;

    @Column({
        type: 'text',
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 10,
    })
    zipCode: string;

    @Column({
        default: false,
    })
    isAdmin: boolean;

    /* RELACION MUCHOS-A-UNO CON provinces */
    @ManyToOne(() => Provinces, (province) => province.users)
    province: Provinces;

    /* RELACION MUCHOS-A-UNO CON cities */
    @ManyToOne(() => Cities, (city) => city.users)
    city: Cities;

}