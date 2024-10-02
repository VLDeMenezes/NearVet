import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUUID, MaxLength, IsDateString } from 'class-validator';

export class CreateClinicalExaminationDto {
  @ApiProperty({description: 'Anamnesis del examen clínico'})
  @IsNotEmpty()
  @IsString()
  anamnesis: string;

  @ApiPropertyOptional({
    description: 'Frecuencia cardíaca del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  fc?: number;

  @ApiPropertyOptional({
    description: 'Frecuencia respiratoria del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  fr?: number;

  @ApiPropertyOptional({
    description: 'Estado de las mucosas del paciente',
    type: String,
    maxLength: 30,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  mucous?: string;

  @ApiPropertyOptional({
    description: 'Tiempo de llenado capilar (TLLC) del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  tllc?: number;

  @ApiPropertyOptional({
    description: 'Temperatura corporal del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiPropertyOptional({
    description: 'Nivel de hidratación del paciente',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  hydration?: number;

  @ApiProperty({
    description: 'Estado de ánimo del paciente',
    type: String,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  moodState: string;

  @ApiProperty({
    description: 'Temperamento del paciente',
    type: String,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  temper: string;

  @ApiProperty({
    description: 'Diagnóstico del examen clínico',
    type: String,
    maxLength: 150,
  })
  @IsNotEmpty() 
  @IsString()
  @MaxLength(150)
  diagnosis: string;

  @ApiProperty({
    description: 'Fecha del examen clínico',
  })
  @IsNotEmpty() 
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'ID de la mascota asociada al examen clínico',
    type: String,
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  petId: string;

  @ApiProperty({
    description: 'ID del veterinario que realizó el examen clínico',
    type: String,
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  veterinarianId: string;
}
