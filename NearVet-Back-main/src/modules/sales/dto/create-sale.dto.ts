import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class CreateSaleDto {

    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    subtotal: number

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    discount: number

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    total: number

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    date: Date

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    advancedPay?: number

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional()
    methodPayId?: string

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    finished?: boolean

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    sendClinical?: boolean
}
