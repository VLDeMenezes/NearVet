import { Injectable } from '@nestjs/common';
import { CreateVetEspecialityDto } from './dto/create-vet-especiality.dto';
import { UpdateVetEspecialityDto } from './dto/update-vet-especiality.dto';

@Injectable()
export class VetSpecialitiesService {
  create(createVetEspecialityDto: CreateVetEspecialityDto) {
    return 'This action adds a new vetEspeciality';
  }

  findAll() {
    return `This action returns all vetEspecialities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vetEspeciality`;
  }

  update(id: number, updateVetEspecialityDto: UpdateVetEspecialityDto) {
    return `This action updates a #${id} vetEspeciality`;
  }

  remove(id: number) {
    return `This action removes a #${id} vetEspeciality`;
  }
}
