import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePrescriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción de la prescripción',
    example: 'Tomar 2 pastillas cada 8 horas',
  })
  description: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del producto asociado con la prescripción',
    example: 'a1234567-89ab-cdef-0123-456789abcdef',
  })
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID del examen clínico asociado con la prescripción',
    example: 'b2345678-90bc-def0-1234-567890abcdef',
  })
  clinicalExaminationId: string;
}
