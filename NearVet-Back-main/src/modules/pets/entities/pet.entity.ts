import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Race } from '../../races/entitites/race.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Sex } from './sex.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Specie } from 'src/modules/species/entities/specie.entity';
import { ClinicalExamination } from 'src/modules/clinical-examination/entities/clinicalExamination.entity';
import { Pending } from 'src/modules/pending/entities/pending.entity';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';

@Entity({
  name: 'pets',
})
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  endDate: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  color: string;

  @Column({ type: 'varchar', nullable: true })
  observation: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weightCurrent: number;

  @Column({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPwSWBMLpGsh7FpkESSq7CVWbd_hSv7Bjp5D17-bJ_-ZA5NF1blEJGjbENfWtfQiq8ZdY&usqp=CAU',
  })
  imgProfile: string;

  /* RELACION MUCHOS-A-UNO CON usuarios */
  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn({name:"userId"})
  user: User;
  @Column({nullable:true})
  userId: string;

  /* RELACION MUCHOS-A-UNO CON especie */
  @ManyToOne(() => Specie, (specie) => specie.pets)
  @JoinColumn({name:"specieId"})
  specie: Specie;
  @Column({nullable:true})
  specieId: string;

  /* RELACION MUCHOS-A-UNO CON raza */
  @ManyToOne(() => Race, (race) => race.pets)
  @JoinColumn({name:"raceId"})
  race: Race;
  @Column({nullable:true})
  raceId: string;

  /* RELACION MUCHOS-A-UNO CON sexo */
  @ManyToOne(() => Sex, (sex) => sex.pets)
  @JoinColumn({name:"sexId"})
  sex: Sex;
  @Column({nullable:true})
  sexId: string;

  // RELACION UNO-A-MUCHOS con appointments
  @OneToMany(() => Appointment, (appointment) => appointment.pet)
  appointments: Appointment[];

  // RELACION UNO-A-MUCHOS con ClinicalExamination
  @OneToMany(() => ClinicalExamination, (clinicalExamination) => clinicalExamination.pet)
  clinicalExaminations: ClinicalExamination[];

  /* RELACION UNO-A-MUCHOS CON pending */
  @OneToMany(() => Pending, (pending) => pending.pet, {cascade:true})
  pendings: Pending[];
  
}
