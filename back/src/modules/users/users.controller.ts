import { Controller, Get, Post, Body, Param, Delete, Query, BadRequestException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    getUsers(@Query('page') page: number = 1 , @Query('limit') limit: number = 5) {
      return this.usersService.getUsersService(Number(page), Number(limit));
    }

    @Get('search')
    getUsersByEmail(@Query(':email') email: string) {
      return this.usersService.getUsersByEmailService(email);
    }

    @Get(':id')
    getUsersById(@Param('id') id: string) {
      return this.usersService.getUsersByIdService(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUserService(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.updateUserService(id, updateUserDto);
    }

    /*
    // CREAR DAR DE BAJA (AGREGAR FECHA DE BAJA EN endDate)
    @Put('unsubscribe')
    unsubscribeUser(@Param('email') email: string){
      return this.usersService.unsubscribeUserService(email)
    }
    */

    // CREAR DELETE (borrar de bd)
    @Delete(':id')
    removeUser(@Param('id') id: string) {
      return this.usersService.removeUserService(id);
    }
}
