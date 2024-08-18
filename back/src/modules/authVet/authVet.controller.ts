import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthVetService } from './authVet.service';
import { CreateAuthVetDto } from './dto/createAuthVet.dto';
import { UpdateAuthVetDto } from './dto/updateAuthVet.dto';

@Controller('auth-vet')
export class AuthVetController {
  constructor(private readonly authVetService: AuthVetService) {}

  @Post()
  create(@Body() createAuthVetDto: CreateAuthVetDto) {
    return this.authVetService.create(createAuthVetDto);
  }

  @Get()
  findAll() {
    return this.authVetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authVetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthVetDto: UpdateAuthVetDto) {
    return this.authVetService.update(+id, updateAuthVetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authVetService.remove(+id);
  }
}
