import { User } from 'src/modules/users/entities/user.entity';
import {Column, Entity, JoinColumn, OneToMany,OneToOne,PrimaryGeneratedColumn} from 'typeorm';
import { Service } from 'src/modules/services/entities/service.entity';
import { ClinicalExamination } from 'src/modules/clinical-examination/entities/clinicalExamination.entity';
import { AvailabilityService } from 'src/modules/availabilityService/entities/availability-service.entity';
  
  @Entity({name: 'veterinarians'})
  export class Veterinarian {
    @PrimaryGeneratedColumn('uuid')
    id: string 
  
    @Column({type: 'int', nullable:false})
    licence: number;

    @Column({type: 'varchar',length: 50, nullable:false})
    specialty: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'int', nullable:false, default: 20})
    delayAtention: number;
  
    /* RELACION UNO-A-UNO CON User */
    @OneToOne(() => User, (user) => user.veterinarian)
    @JoinColumn({ name: 'userId' })
    user: User;
    @Column({type: 'uuid',nullable: true})
    userId: string;

    /* RELACION UNO-A-MUCHOS CON service */
    @OneToMany(() => Service, (service) => service.veterinarian)
    services: Service[];

    /* RELACION UNO-A-MUCHOS CON availabilityService */
    @OneToMany(() => AvailabilityService, (availabilityService) => availabilityService.veterinarian)
    availabilityServices: AvailabilityService[];

     /* RELACION UNO-A-MUCHOS CON ClinicalExamination */
    @OneToMany(() => ClinicalExamination, (clinicalExamination) => clinicalExamination.veterinarian)
    clinicalExaminations: ClinicalExamination[];
  }
  
