import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryServiceDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Veterinaria"})
    categoryService: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example: "En esta Categoria encontraras todos los cuidados para tu mascota"})
    description?: string;  

    @IsString()
    @IsOptional()
    @ApiProperty({example: "no-image.jpg"})
    image?: string;    
}
