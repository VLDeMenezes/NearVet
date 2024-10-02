import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class GetAppointment {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    serviceId: string;
    
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({example: new Date("09-09-2024")})
    date: Date;
    
}
