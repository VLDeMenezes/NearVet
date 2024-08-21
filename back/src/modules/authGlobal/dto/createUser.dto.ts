import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { UserRole } from "../entities/userRole.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(30, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El nombre de usuario es obligatorio.",
        example: "Hernesto",
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(30, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El Apellido es Obligatorio.",
        example: "Harris",
    })
    lastname: string

    @IsNotEmpty()
    @IsEmail()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(30, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El Email es obligatorio, y debe ser un email valido.",
        example: "Harris",
    })
    email: string

    password: string 

    passwordConfirm: string

    birthdate: Date;

    startDate: Date;

    endDate: Date;

    phone: number 

    address: string

    city: string

    province: string

    zipCode: string

    userRoles: UserRole[];

}
