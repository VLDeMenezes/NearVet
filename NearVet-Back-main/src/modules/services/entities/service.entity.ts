import { Veterinarian } from 'src/modules/veterinarian/entities/veterinarian.entity';
import { CategoryService } from '../../categoryServices/entities/categoryService.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import { Treatment } from 'src/modules/treatment/entities/treatment.entity';
import { Pending } from 'src/modules/pending/entities/pending.entity';
import { SaleService } from 'src/modules/sale-services/entities/sale-service.entity';
import { AvailabilityService } from 'src/modules/availabilityService/entities/availability-service.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
  
  @Entity({name: 'services'})
  export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string 
  
    @Column({type: 'varchar',length: 50, nullable:false})
    service: string;

    @Column({type: 'varchar', nullable:false})
    description: string;

    @Column({type: 'varchar', nullable:true})
    sendMesasge: string;

    @Column()
    price: number;

    @Column()
    durationMin: number;

    /* RELACION UNO-A-MUCHOS CON Veterinarian */
    @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.services)
    @JoinColumn({ name: 'veterinarianId' })
    veterinarian: Veterinarian;
    @Column({type: 'uuid',nullable: true})
    veterinarianId: string;
  
    /* RELACION MUCHOS-A-UNO CON CategoryService */
    @ManyToOne(() => CategoryService, (categoryService) => categoryService.services)
    @JoinColumn({ name: 'categoryServiceId' })
    categoryService: CategoryService;
    @Column({type: 'uuid',nullable: true})
    categoryServiceId: string;

    // @OneToMany(() => TypeService, (typeService) => typeService.service)
    // typeServices: TypeService[];

    @OneToMany(() => Treatment, (treatment) => treatment.service)
    treatments: Treatment[];

    @OneToMany(() => AvailabilityService, (availabilityService) => availabilityService.service)
    availabilityService: AvailabilityService[];

    /* RELACION UNO-A-MUCHOS CON pending */
    @OneToMany(() => Pending, (pending) => pending.service)
    pendings: Pending[];
    
    @OneToMany(() => SaleService, (saleService) => saleService.service)
    saleServices: SaleService[];

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments: Appointment[];
  }
  
