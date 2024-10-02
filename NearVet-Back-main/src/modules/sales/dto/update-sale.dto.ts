import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator"

export class UpdateSaleDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    discount: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    total: number

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    methodPayId: string
}
 