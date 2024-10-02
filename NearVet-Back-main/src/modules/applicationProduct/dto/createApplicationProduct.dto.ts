import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateApplicationProductDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: "asd678asd-asd78-87das-98ada-asd788asd"})
    treatmentId:string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: "asd678asd-asd78-87das-98ada-asd788asd"})
    productId:string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 2})
    acount: number = 1;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 200})
    price: number;
}
