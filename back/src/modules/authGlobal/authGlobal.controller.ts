import { Controller, Post, Body } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { userCredentialDto } from './dto/userCredential.dto';
import { User } from './entities/user.entity';

@ApiTags("Authentication")
@Controller('authGlobal')
export class AuthGlobalController {
  constructor(private readonly authGlobalService: AuthGlobalService) {}

  @Post("signin")
  @ApiOperation({ summary: 'Realiza el Login y devuelve el Token de autenicacion'})
  @ApiBody({description:"Las credenciales", type: userCredentialDto})
  // prueba
  @ApiInternalServerErrorResponse({description: "Error al intentar Loguear el Usuario"})
  @ApiBadRequestResponse({description: "Usuario o Clave incorrectos"})
  async signin (@Body() userLogin:userCredentialDto): Promise<Omit<User, "password"> & {token: string}> {
      return await this.authGlobalService.signin(userLogin)
  }

  @Post("signup")
  @ApiOperation({ summary: 'Registra usuarios nuevos'})
  @ApiBody({description:"Ingrese todos los datos requeridos", type: CreateUserDto})
  @ApiInternalServerErrorResponse({description: "Error al intentar Registrar el Usuario"})
  @ApiBadRequestResponse({description: "Si el usuario esta en al Base de Datos: El usuario ya existe / Si las contrseñas no son iguales: La contraseña y su confirmacion no cohinciden"})
  async signup (@Body() user:CreateUserDto): Promise<Omit<User, "password">> {
      
      return await this.authGlobalService.signup(user)
}

}
