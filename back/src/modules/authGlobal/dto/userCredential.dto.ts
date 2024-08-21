import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto"; 

export class userCredentialDto extends PickType(CreateUserDto, ["email", "password"]) {}