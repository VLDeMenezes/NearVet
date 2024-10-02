import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateSaleServiceDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    serviceId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    saleId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    acount: number;
}
