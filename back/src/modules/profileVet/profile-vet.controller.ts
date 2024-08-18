import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileVetService } from './profile-vet.service';
import { CreateProfileVetDto } from './dto/create-profile-vet.dto';
import { UpdateProfileVetDto } from './dto/update-profile-vet.dto';

@Controller('profile-vet')
export class ProfileVetController {
  constructor(private readonly profileVetService: ProfileVetService) {}

  @Post()
  create(@Body() createProfileVetDto: CreateProfileVetDto) {
    return this.profileVetService.create(createProfileVetDto);
  }

  @Get()
  findAll() {
    return this.profileVetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileVetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileVetDto: UpdateProfileVetDto) {
    return this.profileVetService.update(+id, updateProfileVetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileVetService.remove(+id);
  }
}
