import { BadRequestException, Injectable} from '@nestjs/common';
import { PetsRepository } from './pets.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Sex } from './entities/sex.entity';
import { Race } from '../races/entitites/race.entity';
import { Pet } from './entities/pet.entity';
import { Specie } from '../species/entities/specie.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class PetsService {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly emailService: EmailService,
  ) {}

  async getPetsService() {
    return await this.petsRepository.getPetsRepository();
  }

  async getPetByIdService(id: string) {
    return await this.petsRepository.getPetByIdRepository(id);
    
  }

  async getPetsByUserService(id: string): Promise<Pet[]> {
    return await this.petsRepository.getPetsByUserRepository(id);
  }

  async getPetRacesService(specie: string): Promise<Race[]> {
    return await this.petsRepository.getPetRacesRepository(specie);
  }

  async getPetSpeciesService(): Promise<Specie[]> {
    return await this.petsRepository.getPetSpeciesRepository();
  }
 
  async getPetSpeciesandRacesService(): Promise<Specie[]> {
    return await this.petsRepository.getPetSpeciesandRacesRepository();
  }

  async getPetsSexService(): Promise<Sex[]> {
    return await this.petsRepository.getPetsSexService();
  }

  async createPetService(createPetDto: CreatePetDto) {
    const pet = await this.petsRepository.createPetRepository(createPetDto);
    await this.emailService.registerPetNotification(pet.id);
    return pet;
  }

  async updatePetService(id: string, updatePetDto: Partial<Pet>) {
    return await this.petsRepository.updatePetRepository(id, updatePetDto);
  }

  async removePetService(id: string) {
    return await this.petsRepository.removePetRepository(id);
  }

  async uploadImgProfileService(id: string, file: Express.Multer.File) {
    const pet = await this.petsRepository.getPetByIdRepository(id);
    if (!pet) throw new BadRequestException('La mascota que desea actualizar no existe');
    const imgUpload = await this.cloudinaryService.uploadImage(file);
    await this.petsRepository.updatePetRepository(id, {
      imgProfile: imgUpload.secure_url,
    });
    return await this.petsRepository.getPetByIdRepository(id);
  }
}
