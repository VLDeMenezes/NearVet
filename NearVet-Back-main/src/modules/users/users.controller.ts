import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags, ApiParam, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from './roles/roles.enum';
import { AuthGuard } from '../authGlobal/guards/Auth.guard';
import { CreateUserWebDto } from './dto/createUserWeb.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios' })
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsersService(Number(page), Number(limit));
  }

  @Get('userRoles')
  @ApiOperation({ summary: 'Obtener todos los roles de usuarios' })
  getRolesUsers() {
    return this.usersService.getRolesUsersService();
  }

  @Get('userRoles/:role')
  @ApiOperation({ summary: 'Obtener Rol de usuario por el nombre del rol' })
  getRolesUsersByRole(@Param('role') role: Role) {
    return this.usersService.getRolesUsersByRoleService(role);
  }

  @Get('roles/:role')
  @ApiOperation({ summary: 'Obtener usuarios por rol específico' })
  async getUsersByRoleRepository(@Param("role") role: Role) {
    return await this.usersService.getUsersByRoleRepository(role);
  }

  @Get('search-by-email')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar usuarios por email' })
  getUsersByEmail(@Query('email') email: string): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByEmailService(email);
  }

  @Get('search-by-dni')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar usuarios por DNI' })
  getUsersByDni(@Query('dni') dni: number): Promise<Omit<User, 'password'>> {
    return this.usersService.getUsersByDniService(dni);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUsersByIdService(id);
  }

  @Post("createUserVeterinarian")
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crea un nuevo medico veterinario' })
  createUserVeterinarian(@Body() user: CreateUserWebDto) {
    return this.usersService.createUserVeterinarian(user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar un usuario' })
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeUserService(id);
  }

  @Put('imgProfile/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir imagen de perfil de usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string', format: 'uuid' })
  @ApiBody({
    description: `Debe subir el Archivo de Imagen`,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Imagen de perfil subida exitosamente' })
  async uploadImgProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10000000,
            message: 'El Archivo debe ser menor a 10Mb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('File', file);
    return await this.usersService.uploadImgProfileService(id, file);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateUserDto, description: 'Datos a actualizar del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserService(id, updateUserDto);
  }
  
}
