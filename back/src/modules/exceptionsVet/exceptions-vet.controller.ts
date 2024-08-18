import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExceptionsVetService } from './exceptions-vet.service';
import { CreateExceptionsVetDto } from './dto/create-exceptions-vet.dto';
import { UpdateExceptionsVetDto } from './dto/update-exceptions-vet.dto';

@Controller('exceptions-vet')
export class ExceptionsVetController {
  constructor(private readonly exceptionsVetService: ExceptionsVetService) {}

  @Post()
  create(@Body() createExceptionsVetDto: CreateExceptionsVetDto) {
    return this.exceptionsVetService.create(createExceptionsVetDto);
  }

  @Get()
  findAll() {
    return this.exceptionsVetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exceptionsVetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExceptionsVetDto: UpdateExceptionsVetDto) {
    return this.exceptionsVetService.update(+id, updateExceptionsVetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exceptionsVetService.remove(+id);
  }
}
