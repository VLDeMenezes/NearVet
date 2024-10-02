import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('seeder')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cargar archivo de usuarios' })
  addUsers() {
    return this.seederService.loadUsersData();
  }
  @Post('pets')
  @ApiOperation({ summary: 'Cargar archivo de mascotas' })
  addPets() {
    return this.seederService.loadPetsData();
  }

  @Post('roles')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cargar archivo de roles' })
  addRoles() {
    return this.seederService.loadRolesData();
  }

  @Post('preloadInitial')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Precarga Inicial de toda la Base de Datos' })
  preloadInitial() {
    return this.seederService.preloadInitial();
  }

  /* 


  @Post('veterinaries')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cargar archivo de veterinarios' })
  addVeterinaries() {
    return this.seederService.loadVeterinariesData();
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Borra los datos de productos y los vuelva a cargar',
  })
  @ApiResponse({ status: 200, description: 'Datos reiniciados correctamente' })
  @ApiResponse({
    status: 403,
    description:
      'No se pueden reiniciar los datos porque hay claves foraneas realcionadas',
  })
  resetData() {
    return this.seederService.resetData();
  } */
}
