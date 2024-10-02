import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePendingDto {
  @ApiPropertyOptional({
    description: 'Descripción de la pendiente',
    example: 'Revisión médica para la mascota',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Fecha de la pendiente',
    example: '2024-09-10T14:00:00.000Z',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'Fecha de finalización de la pendiente (opcional)',
    example: '2024-09-10T16:00:00.000Z',
    required: false,
  })
  @IsNotEmpty()
  @IsDateString()
  endPending: Date;

  @ApiProperty({
    description: 'Indica si hay una notificación',
    example: false,
    default: false,
  })
  @IsBoolean()
  notification: boolean;

  @ApiProperty({
    description: 'ID del servicio asociado',
    example: 'cce5b510-1bf5-42db-9e3a-b1325b7564e9',
  })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    description: 'ID de la mascota asociada',
    example: 'a6c5f31e-8a1b-41f2-bd55-5c347b5ff3c9',
  })
  @IsUUID()
  @IsNotEmpty()
  petId: string;

  @ApiProperty({
    description: 'ID del usuario asociado',
    example: 'b7a7f31f-7f81-42f8-91ff-3cbbd47e125d',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
