import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({example: '34576894'})
  @IsNotEmpty()
  @IsNumber()
  dni: number;

  @ApiProperty({example: 'pruEba123&%'})
  @IsNotEmpty()
  @IsString()
  password: string;
}
