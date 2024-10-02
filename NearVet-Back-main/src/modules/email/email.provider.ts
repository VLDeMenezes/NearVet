import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/createEmail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vet } from '../vets/entities/vet.entity';
import { Repository } from 'typeorm';

export class DataVetEmail {
  serviceEmail: string;
  email: string;
  passEmail: string;
}

@Injectable()
export class EmailProvider {
  
  constructor (@InjectRepository(Vet) private vetRepository: Repository<Vet>) {}

  async sendEmail(sendEmailDto: SendEmailDto): Promise<string> {
    
    // levanto los datos de la empresa
    const serviceEmail = await this.vetRepository.find()

    // configuro el servicor de email
    const transporter = nodemailer.createTransport({
          service: serviceEmail[0].serviceEmail,
          auth: {
            user: serviceEmail[0].email,
            pass: serviceEmail[0].passEmail,
          },
        });
    
    // hago el envio del email
    const info = await transporter.sendMail({
          from: serviceEmail[0].email, // sender address
          to: sendEmailDto.to, // list of receivers
          subject: sendEmailDto.subject,
          text: sendEmailDto.text,
          html: sendEmailDto.html,
    });

    /* console.log('Message sent: %s', info.messageId);
    console.log('este es info', info); */
    return info.messageId;
  }

}


