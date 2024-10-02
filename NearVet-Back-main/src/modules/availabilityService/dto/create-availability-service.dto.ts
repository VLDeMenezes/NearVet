import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAvailabilityServiceDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: "1"})
    day: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "09:00"})
    startHour1: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "12:30"})
    endHour1: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({example: "16:00"})
    startHour2?: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({example: "20:00"})  
    endHour2?: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    serviceId: string;
}
