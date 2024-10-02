import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FileTraetmentRepository } from './file-treatment.repository';
import { FileTreatment } from './entities/file-treatment.entity';
import { DeleteResult } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FileTreatmentService {
  
  constructor (private readonly fileTreatmentRepository: FileTraetmentRepository,
    private readonly cloudinaryService:CloudinaryService,
  ){}
  
  async getFiles (): Promise<FileTreatment[]> {
    return await this.fileTreatmentRepository.getFiles()
  }

  async getFileByTreatmentId (clinicalExaminationId:string): Promise<FileTreatment[]> {
    const files: FileTreatment[] = await this.fileTreatmentRepository.getFileByTreatmentId(clinicalExaminationId)
    return files
  }

  async addFile (clinicalExaminationId: string, file: Express.Multer.File): Promise<FileTreatment> {
    const imgUpload = await this.cloudinaryService.uploadImage(file);
    const fileCreated: FileTreatment = await this.fileTreatmentRepository.addFile({image:imgUpload.secure_url, clinicalExaminationId})
    if (!fileCreated) throw new InternalServerErrorException("No se pudo cargar el archivo")
    return fileCreated
  }

  // async updateFile (id:string, file:Partial<FileTreatment>): Promise<string> {
  //   const fileUpdate: UpdateResult = await this.fileTreatmentRepository.updateFile(id, file);
  //   if (fileUpdate.affected === 0) throw new NotFoundException("No se encontro el archivo a actualizar")
  //   return id
  // }

  async removeFile (id:string): Promise<string> {
    const fileDelete: DeleteResult = await this.fileTreatmentRepository.removeFile(id)  
    if (fileDelete.affected === 0) throw new NotFoundException("No se encontro el archivo a eliminar")
    return id
  }
}
