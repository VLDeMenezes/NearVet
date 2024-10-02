import { Pet } from 'src/modules/pets/entities/pet.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatesAppointment } from './statesAppointment.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { Coupon } from 'src/modules/coupons/entities/coupon.entity';
//import { Service } from 'src/modules/services/entities/service.entity';

@Entity({
  name: 'appointments',
})
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 5 })
  time: string;

  @Column({ type: 'varchar', nullable:true })
  messageUser: string;

  @Column({ type: 'int' })
  price: number;

  /* RELACION MUCHOS-A-UNO CON mascotas */
  @ManyToOne(() => Pet, (pet) => pet.appointments)
  @JoinColumn({ name: 'petId' })
  pet: Pet;
  @Column({type:"uuid", nullable:true})
  petId:string

  /* RELACION MUCHOS-A-UNO CON estado de turnos */
  @ManyToOne(() => StatesAppointment, (stateAppointment) => stateAppointment.appointments)
  @JoinColumn({ name: 'stateAppointmentId' })
  state: StatesAppointment;
  @Column({type:"uuid", nullable:true})
  stateAppointmentId:string

  /* RELACION MUCHOS-A-UNO CON services*/
  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinColumn({ name: 'serviceId' })
  service: Service;
  @Column({type:"uuid", nullable:true})
  serviceId:string

}
