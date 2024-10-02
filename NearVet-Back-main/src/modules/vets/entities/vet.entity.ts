import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'vets',
})
export class Vet {
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
    nameCompany: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    passEmail: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
   serviceEmail: string;

   @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    })
    urlWebPage: string;

    @Column({
        type: 'bigint',
        nullable: false,
        unique: true,
    })
    cuit: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    address: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    city: string;

    @Column({
        type: 'date',
        nullable: false,
        default: () => 'CURRENT_DATE',
    })
    startDate: Date;
    

    @Column({
        type: 'varchar',
        nullable: false,
        default:
          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
    })
    imgProfile: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default:
          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
    })
    imgBanner: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default:
          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
    })
    imgLogo: string;



    // RELACION MUCHOS-A-UNO CON users
    @OneToOne(() => User, (user) => user.vet)
    @JoinColumn({name: "userId"})
    user: User; 
    @Column({type: "uuid", nullable:true})
    userId: string
}
