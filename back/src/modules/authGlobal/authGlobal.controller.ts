import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { CreateAuthGlobalDto } from './dto/createAuthGlobal.dto';
import { UpdateAuthGlobalDto } from './dto/updateAuthGlobal.dto';

@Controller('auth-global')
export class AuthGlobalController {
  constructor(private readonly authGlobalService: AuthGlobalService) {}

  @Post()
  create(@Body() createAuthGlobalDto: CreateAuthGlobalDto) {
    return this.authGlobalService.create(createAuthGlobalDto);
  }

  @Get()
  findAll() {
    return this.authGlobalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authGlobalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthGlobalDto: UpdateAuthGlobalDto) {
    return this.authGlobalService.update(+id, updateAuthGlobalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authGlobalService.remove(+id);
  }
}
