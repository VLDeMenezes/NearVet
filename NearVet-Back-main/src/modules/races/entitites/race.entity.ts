import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../../pets/entities/pet.entity';
import { Specie } from 'src/modules/species/entities/specie.entity';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

@Entity({
  name: 'races',
})
export class Race {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  race: string;

  /* RELACION UNO-A-MUCHOS CON pets */
  @OneToMany(() => Pet, (pet) => pet.specie)
  pets: Pet[];

  /* RELACION MUCHOS-A-UNO CON species */
  @ManyToOne(() => Specie, (specie) => specie.races)
  @JoinColumn({name:"specieId"})
  specie: Specie;
  @Column({type:"uuid", nullable:false})
  specieId:string
}
