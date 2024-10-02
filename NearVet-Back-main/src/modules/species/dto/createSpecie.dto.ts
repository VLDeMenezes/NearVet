import { IsString, Length } from 'class-validator';

export class CreateSpeciesDto {
  @IsString()
  @Length(1, 50)
  specie: string;
}
