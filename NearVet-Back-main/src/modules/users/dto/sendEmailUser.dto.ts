import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string; // El destinatario del correo electrónico

  @IsString()
  @IsNotEmpty()
  subject: string; // El asunto del correo electrónico

  @IsString()
  @IsNotEmpty()
  text: string; // El cuerpo del correo en texto plano

  @IsString()
  html?: string; // El cuerpo del correo en formato HTML (opcional)
}
