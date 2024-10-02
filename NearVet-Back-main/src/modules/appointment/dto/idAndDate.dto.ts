import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class IdAndDateDto {
    
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({example: "sdfsdfsdf-sdf4-sdfsf34-sf4fw-dfsdfsdf"})
    id: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({example: new Date("2024-09-11")})
    startDate: Date; 

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({example: new Date("2024-09-11")})
    endDate: Date; 

}