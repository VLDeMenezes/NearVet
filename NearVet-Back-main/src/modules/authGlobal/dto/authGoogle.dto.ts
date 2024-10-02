import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthGoogleDto {

  @ApiProperty({example: 'example@example.com'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({example: new Date()})
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiPropertyOptional({example: 'example@example.com'})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({example: 'example@example.com'})
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({example: 'example@example.com'})
  @IsOptional()
  @IsString()
  imgProfile?: string;

}
