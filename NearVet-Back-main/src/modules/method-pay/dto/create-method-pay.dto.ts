import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMethodPayDto {
  @ApiProperty({ description: 'Nombre del método de pago' })
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({ description: 'Interes' })
  @IsNotEmpty()
  interest: number;
}
