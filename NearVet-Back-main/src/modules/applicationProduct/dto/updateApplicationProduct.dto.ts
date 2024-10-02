import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationProductDto {
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({example:3})
    acount?: number;
  
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({example:250})
    price?: number;
  
}
