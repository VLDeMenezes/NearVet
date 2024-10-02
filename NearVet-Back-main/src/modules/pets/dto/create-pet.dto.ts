import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ description: 'El nombre es obligatorio', example: 'Firulais' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiPropertyOptional({
    description: 'La fecha de nacimiento no es obligatoria',
    example: new Date('01-07-2024'),
  })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @ApiProperty({
    description: 'La fecha de ingreso en el sistema es obligatoria',
    example: new Date('01-08-2024'),
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({
    description: 'El color es obligatorio',
    example: 'Blanco',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  color: string;

  @ApiPropertyOptional({
    description: 'El peso actual no es obligatorio',
    example: 8.5,
  })
  @IsOptional()
  @IsNumber()
  weightCurrent?: number;

  @ApiPropertyOptional({
    description: 'La Observacion no es obligatoria',
    example: 'Suele ser un perro agresivo',
  })
  @IsOptional() 
  @IsString()
  observation?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'Este es el ID del usuario dueño de la mascota',
    example: '21131006-7eae-47f8-93c2-1264c6be49cb',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({
    description: 'El id de la especie no es obligatorio',
    example: 'b139b26e-0282-45b3-8c96-00158a5f9644',
  })
  @IsOptional()
  @IsUUID()
  specieId?: string;

  @ApiPropertyOptional({
    description: 'El id de la raza no es obligatorio',
    example: 'c38ad062-8b9f-432f-8f82-a3e660956643',
  })
  @IsOptional()
  @IsUUID()
  raceId?: string;

  @ApiPropertyOptional({
    description: 'El id del sexo no es obligatorio',
    example: '9e060c6d-81d0-4700-8d7d-6a66a139ecc4',
  })
  @IsOptional()
  @IsString()
  sexId?: string;
}
