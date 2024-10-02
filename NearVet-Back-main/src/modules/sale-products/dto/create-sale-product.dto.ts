import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateSaleProductDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    productId: string;

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
