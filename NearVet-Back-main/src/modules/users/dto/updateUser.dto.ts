import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Validate,
} from 'class-validator';
import { passwordCompare } from '../../../decorators/comparePass.decorator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'El nombre es Opcional',
    example: 'Carlos',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiPropertyOptional({
    description: 'El Apellido es Opcional',
    example: 'Amadeo',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @ApiPropertyOptional({
    description: 'El DNI es Opcional',
    example: '34576894',
  })
  @IsOptional()
  @IsNumber()
  dni: number;

  @ApiPropertyOptional({
    description: 'Debe ser un email válido',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  @Length(1, 50)
  email: string;

  @ApiPropertyOptional({
    description: 'La fecha de nacimiento es opcional',
    example: new Date('1/2/2024'),
  })
  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @ApiPropertyOptional({
    description: 'El numero de telefono es opcional, Ingresar solo numeros',
    example: '1168775654',
  })
  @IsNumber()
  @IsOptional()
  phone: number;

  @ApiPropertyOptional({
    description: 'La dirección del domicilio es Opcional',
    example: 'Avenida Importante 4000',
  })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  address: string;

  @ApiPropertyOptional({
    description: `La ciudad es Opcional.`,
    example: 'Example City',
  })
  @IsOptional()
  @IsString()
  city: string; 
}
