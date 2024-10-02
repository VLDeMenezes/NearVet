import { Controller, Post, Body, HttpCode} from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserWebDto } from '../users/dto/createUserWeb.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '../users/entities/user.entity';
import { AuthGoogleDto } from './dto/authGoogle.dto';

@ApiTags('Authentication')
@Controller('authGlobal')
export class AuthGlobalController {
  constructor(private readonly authGlobalService: AuthGlobalService) {}

  @Post('signin')
  @ApiOperation({summary: 'Realiza el Login de usuarios'})
  @ApiBody({ description: 'Las credenciales', type: LoginUserDto })
  @HttpCode(200)
  async signin(@Body() userLogin: LoginUserDto): Promise<Omit<User, 'password'> & { token: string }> {
    return await this.authGlobalService.signin(userLogin);
  }

  @Post('signup')
  @ApiOperation({summary: 'Registra usuarios nuevos'})
  @ApiBody({description: 'Ingrese todos los datos requeridos', type: CreateUserWebDto})
  async signup(@Body() user: CreateUserWebDto): Promise<Omit<User, 'password' | 'role'>> {
    return await this.authGlobalService.signup(user);
  }

  @Post('signupGoogle')
  @ApiOperation({summary: 'Registra y loguea usuarios desde su cuenta de Google'})
  @ApiBody({description: 'Ingrese todos los datos requeridos', type: AuthGoogleDto})
  async authGoogle(@Body() user: AuthGoogleDto): Promise<Omit<User, 'password'> & { token: string }> {
    return await this.authGlobalService.signupGoogle(user);
  }

}
