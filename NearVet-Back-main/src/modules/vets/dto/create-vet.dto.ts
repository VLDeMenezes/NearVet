import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDate, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateVetDto {
  @ApiProperty({
  description: 'El nombre de fantasia de la compañia',
      example: 'Veterinaria de la Esquina',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    description: 'El nombre legal de la compañia',
    example: 'Veterinaria del Barrio S.A.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  nameCompany: string;

  @ApiProperty({
    description: 'El cuit es obligatorio (sin guiones)',
    example: '12123456789',
  })
  @IsNotEmpty()
  @IsNumber()
  cuit: number;

  @ApiProperty({
    description: 'La dirección de la veterinaria es obligatoria',
    example: 'Avenida de Prueba 123, Zona de Prueba',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  address: string;

  @ApiProperty({
    description: 'La ciudad es obligatoria',
    example: 'Buenos Aires',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  city: string;

  @ApiProperty({
    description: 'La foto de perfil',
    example: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
  })
  @IsOptional()
  @IsUrl()
  imgProfile?: string;

  @ApiProperty({
    description: 'La foto para banner',
    example: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
  })
  @IsOptional()
  @IsUrl()
  imgBanner?: string;

  @IsOptional()
  @IsUUID()
  userId?: string; 
}
