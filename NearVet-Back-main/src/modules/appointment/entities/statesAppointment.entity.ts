import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity({
  name: 'states_appointments',
})
export class StatesAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  state: string;

  @OneToMany(() => Appointment, (appointment) => appointment.state)
  appointments: Appointment[];
}
