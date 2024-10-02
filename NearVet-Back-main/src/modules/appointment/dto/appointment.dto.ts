import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2024-01-10' })
  @IsNotEmpty()
  @Transform(({ value }) => value.split('T')[0]) // Esto convierte la fecha a 'YYYY-MM-DD'
  date: Date;

  @ApiProperty({ example: '08:30' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Formato de hora incorrecto' }) // Valida formato de hora HH:mm
  time: string;

  @ApiPropertyOptional({ example: 'Mi perro no come' })
  @IsOptional()
  @IsString()
  messageUser?: string;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: '4418276c-ef71-4e7a-bb80-a52458996a06' })
  @IsNotEmpty()
  @IsUUID()
  petId: string;

  @ApiProperty({ example: '83c47570-47ee-4fe7-8b7e-a8416947b58a' })
  @IsNotEmpty()
  @IsUUID()
  serviceId: string;
}

export class EditAppointmentDto {
  @ApiPropertyOptional({ example: '2024-01-11' })
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({ example: '08:30' })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Formato de hora incorrecto' }) // Valida formato de hora HH:mm
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({ example: 'Mi perro no caga' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  messageUser?: string;

  @ApiPropertyOptional({ example: '07bdc58c-a922-4237-a57d-99d1fc188fc1' })
  @IsOptional()
  serviceId?: string;
}
