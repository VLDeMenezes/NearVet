import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Nombre del producto. Es Obligatorio",
        example:"Antibiotico Oxa V12"
    })
    name: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Descripcion del producto. Es Opcional",
        example:"Antibiotico para las infecciones de las heridas abiertas"
    })
    description?: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "URL de la Imagen del producto. Es Opcional",
        example:"noImagen.jpg"
    })
    image?: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: "Costo del producto. Es Obligatorio",
        example: 350
    })
    cost: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: "Stock del producto. Es Obligatorio",
        example: 10
    })
    stock: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: "Precio de venta del producto. Es Obligatorio",
        example: 700
    })
    price: number;

    // @IsUUID()
    // @IsNotEmpty()
    // @ApiProperty({
    //     description: "Id de la categoria correspondiente al producto. Es Obligatorio",
    //     example: "asd567asd-asd56-56mkj-56l6j-asd789jkl"
    // })
    // categoryProductId: string;
}
