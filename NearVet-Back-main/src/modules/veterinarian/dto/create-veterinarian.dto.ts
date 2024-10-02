import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateVeterinarianDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description:"La licencia del veterinario es Obligatoria",
                   example: 10456 })
    licence: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description:"La especialidad del veterinario es Obligatoria",
                   example: "Licenciado en Cardiologia" })
    specialty: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description:"La Descripcion del veterinario es Obligatoria. Sirve para presentarlo en la pagina",
                   example: "Fulanito de tal tiene una maestria en perros, Estudio 5 años en oxford donde consiguio su postgrado. etc" })
    description: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ description:"La licencia del veterinario es Obligatoria",
                   example: "23jbj42jk2-123mk-23kjh-23jkl-123j23ih123mni" })
    userId: string;

}
