import { Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';
import { SendEmailDto } from './dto/createEmail.dto';
import { User } from '../users/entities/user.entity';
import { notificationAppointmentUserEmail, notificationAppointmentVetEmail, notificationCouponUserEmail, notificationRegisterPetEmail, recordingAppointmentEmail, recordingPendingEmail, welcomeCHATGPT } from './plantillas/plantillasHTML';
import { Appointment } from '../appointment/entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vet } from '../vets/entities/vet.entity';
import { Equal, In, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { Pet } from '../pets/entities/pet.entity';
import { Coupon } from '../coupons/entities/coupon.entity';
import { Pending } from '../pending/entities/pending.entity';

@Injectable()
export class EmailService {
  constructor(private readonly emailProvider: EmailProvider,
              @InjectRepository(Vet) private vetRepository: Repository<Vet>,
              @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
              @InjectRepository(Pet) private petRepository: Repository<Pet>,
              @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
              @InjectRepository(Pending) private pendingRepository: Repository<Pending>,
  ) {}
  //notificaciones por accion
      // cuando se registra un usuario. // LISTO
      // cuando saca un nuevo turno. al cliente y al veterinario. /// LISTO
      // cuando registra una mascota. // LISTO
      // cuando se envia un cupon de descuento. // LISTO
  async WelcomeEmail(userDB: User, password:string, byGoogle:boolean): Promise<string> {
    const vet: Vet[] = await this.vetRepository.find()
    const sendEmailWelcome: SendEmailDto = {
      to: userDB.email,
      subject: `¡Bienvenido ${userDB.name}! - ${vet[0].name}`,
      html: welcomeCHATGPT({nombre:userDB.name, email:userDB.email , passwordDefault:password, logo: vet[0].imgLogo, byGoogle}),
      };
    return this.emailProvider.sendEmail(sendEmailWelcome);
  }

  async appointmentNotification(appointmentId: string): Promise<string> {
    const appointment: Appointment = await this.appointmentRepository.findOne({
      where : {id: appointmentId},
      relations: {pet:{ user:true},
                  service:{ veterinarian: {user:true}}}
  })
    const vet: Vet[] = await this.vetRepository.find()
    const sendEmailUser: SendEmailDto = {
      to: appointment.pet.user.email,
      subject: `¡Hola ${appointment.pet.user.name}! - Sacaste un turno en ${vet[0].name}`,
      html: notificationAppointmentUserEmail(appointment, vet[0]),
      };
    this.emailProvider.sendEmail(sendEmailUser);

    const sendEmailVet: SendEmailDto = {
      to: appointment.pet.user.email,
      subject: `¡Hola ${appointment.pet.user.name}! - Sacaste un turno en ${vet[0].name}`,
      html: notificationAppointmentVetEmail(appointment, vet[0]),
      };
    this.emailProvider.sendEmail(sendEmailVet);
    return "Se dio aviso al cliente y al veterinario";
  }

  async registerPetNotification(petId: string): Promise<string> {
    const pet: Pet = await this.petRepository.findOne({
      where : {id: petId},
      relations: {user:true,
                  specie: true,
                  race:true, 
                  sex: true}
    })
    const vet: Vet[] = await this.vetRepository.find()
    const sendEmailRegPet: SendEmailDto = {
      to: pet.user.email,
      subject: `¡Hola ${pet.user.name}! - Registro de mascota en ${vet[0].name}`,
      html: notificationRegisterPetEmail(pet, vet[0]),
      };
    this.emailProvider.sendEmail(sendEmailRegPet);

    return "Se envio el aviso al cliente sobre el registro de mascota";
  }

  async sendCouponToUser (couponId:string): Promise<string> {
    const coupon: Coupon = await this.couponRepository.findOne({
      where : {id: couponId},
      relations: {user:true}
    })
    const vet: Vet[] = await this.vetRepository.find()
    const sendEmailCouponUser: SendEmailDto = {
      to: coupon.user.email,
      subject: `¡Hola ${coupon.user.name}! - Tenes un descuento en ${vet[0].name}`,
      html: notificationCouponUserEmail(coupon, vet[0]),
      };
    this.emailProvider.sendEmail(sendEmailCouponUser);

    return "Se envio el aviso al cliente su cupon de descuento";
  }


  //notificaciones programadas
      // Aviso de fecha cercana al pendiente... Sugerirle que saque el turno y ponerle un link redireccionando a sacar el turno // LISTO
      // Aviso de fecha cercana al turno. que no falte y avisos de cuidados previos. // LISTO
  @Cron('0 0 8 * * *')  // Este cron ejecuta la tarea todos los días a las 08:00 AM
  async recordingPending() {
        
        const dateAddThree = new Date();
        dateAddThree.setDate(dateAddThree.getDate() + 3)
        const dateAddSeven = new Date();
        dateAddSeven.setDate(dateAddThree.getDate() + 7)
        const dateAddOne = new Date();
        dateAddOne.setDate(dateAddThree.getDate() + 1)
        // Consulto todas los pending activos.
        const activePendings: Pending[] = await this.pendingRepository.find({
          where : {endPending: In([dateAddThree, dateAddOne, dateAddSeven])},
          relations: {pet:{ user:true},
                      service:true}
      })

      // traigo info de la veterinaria
      const vet: Vet[] = await this.vetRepository.find()

        // si la fecha de hoy es una semana antes del endPending 
        //o 3 dias antes o un dia antes enviamos email
        activePendings.forEach ((pending) => {
          const sendEmail: SendEmailDto = {
            to: pending.pet.user.email,
            subject: `¡Hola ${pending.pet.user.name}! - No Olvides sacar turno con ${vet[0].name}`,
            html: recordingPendingEmail(pending, vet[0]),
            };
          this.emailProvider.sendEmail(sendEmail);
        })
    }

    @Cron('0 1 8 * * *')  // Este cron ejecuta la tarea todos los días a las 08:01 AM
    async recordingAppointment() {
        
      const dateAddThree = new Date();
        dateAddThree.setDate(dateAddThree.getDate() + 3)
        const dateAddSeven = new Date();
        dateAddSeven.setDate(dateAddThree.getDate() + 7)
        const dateAddOne = new Date();
        dateAddOne.setDate(dateAddThree.getDate() + 1)
      // Consulto todas los turnos pendientes.
        const activeAppointment: Appointment[] = await this.appointmentRepository.find({
            where : {state: {state: "Pendiente"}, date: In([dateAddOne, dateAddThree, dateAddSeven])},
            relations: {pet:{ user:true},
                        service:true}
        })
        // traigo info de la veterinaria
        const vet: Vet[] = await this.vetRepository.find()
        
        activeAppointment.forEach ((appointment) => {
          const sendEmail: SendEmailDto = {
            to: appointment.pet.user.email,
            subject: `¡Hola ${appointment.pet.user.name}! - No Olvides tu Turno en ${vet[0].name}`,
            html: recordingAppointmentEmail(appointment, vet[0]),
            };
          this.emailProvider.sendEmail(sendEmail);
        })
    }

}
