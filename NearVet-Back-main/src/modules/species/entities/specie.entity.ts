import { Pet } from 'src/modules/pets/entities/pet.entity';
import { Race } from 'src/modules/races/entitites/race.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({
  name: 'species',
})
export class Specie {
  @PrimaryGeneratedColumn('uuid')
  id: string 

  @Column({
    type: 'varchar',
    length: 50,
  })
  specie: string;

  /* RELACION UNO-A-MUCHOS CON pets */
  @OneToMany(() => Pet, (pet) => pet.specie)
  pets: Pet[];

  /* RELACION UNO-A-MUCHOS CON race */
  @OneToMany(() => Race, (race) => race.specie)
  races: Race[];
}
