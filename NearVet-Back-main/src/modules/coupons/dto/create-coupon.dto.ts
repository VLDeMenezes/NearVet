import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsUUID, Min, Max, IsOptional } from 'class-validator';
export class CreateCouponDto {
  @ApiProperty({ example: 'SUMMER2024' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 15.5 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  valorPorc: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  used?: boolean;

  @ApiProperty()
  @IsUUID()
  userId: string;

}
