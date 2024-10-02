import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import { RacesService } from './races.service';
  import {
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
  
  @ApiTags('Races')
  @Controller('races')
  export class RacesController {
    constructor(private readonly racesService: RacesService) {}
  
    @Get()
    @ApiOperation({summary: 'Obtiene todas las razas'})
    getAllRaces() {
      return this.racesService.getAllRacesService();
    }
  
    @Get(':id')
    @ApiOperation({summary: 'Obtiene una raza por ID'})
    getRaceById(@Param('id', ParseUUIDPipe) id: string) {
      return this.racesService.getRaceByIdService(id);
    }
  
    @Post()
    @ApiOperation({summary: 'Crea una nueva raza'})
    createRace(@Body() race: CreateRaceDto) {
      return this.racesService.createRaceService(race);
    }
  
    @Put(':id')
    @ApiOperation({summary: 'Actualiza una raza existente'})
    updateRace(@Param('id', ParseUUIDPipe) id: string,
               @Body() updateRaceDto: UpdateRaceDto ) {
      return this.racesService.updateRaceService(id, updateRaceDto);
    }
  
    @Delete(':id')
    @ApiOperation({summary: 'Elimina una raza'})
    deleteRace(@Param('id', ParseUUIDPipe) id: string) {
      return this.racesService.deleteRaceService(id);
    }
  }
  