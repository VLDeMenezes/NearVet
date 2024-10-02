import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRaceDto {
  @ApiProperty({
    description: 'Nombre de la raza',
    example: 'Labrador',
  })
  @IsNotEmpty()
  @IsString()
  race: string;

  @ApiProperty({
    description: 'ID de la especie a la que pertenece la raza',
    example: 'e8f3cabe-5e44-4d27-a8b6-4f8e3bf77f27',
  })
  @IsNotEmpty()
  @IsUUID()
  specieId: string;
}
