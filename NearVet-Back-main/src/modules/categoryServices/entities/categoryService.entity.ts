
import { Service } from '../../services/entities/service.entity';
import {Column, Entity, OneToMany,PrimaryGeneratedColumn} from 'typeorm';
  
  @Entity({name: 'categoryServices'})
  export class CategoryService {
    @PrimaryGeneratedColumn('uuid')
    id: string 
  
    @Column({
      type: 'varchar',
      length: 50,
      nullable:false,
    })
    categoryService: string;

    @Column({
        type: 'varchar',
        nullable:true,
      })
      description: string;  
    
      @Column({
        type: 'varchar',
        nullable:true,
      })
      image: string;    
  
    /* RELACION UNO-A-MUCHOS CON race */
    @OneToMany(() => Service, (service) => service.categoryService)
    services: Service[];
  }
  