import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileTreatment } from './entities/file-treatment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FileTraetmentRepository {

    constructor (@InjectRepository(FileTreatment) private fileTreatmentRepository: Repository<FileTreatment>) {}

    async getFiles (): Promise<FileTreatment[]> {
        return await this.fileTreatmentRepository.find()
    }

    async getFileByTreatmentId (clinicalExaminationId:string): Promise<FileTreatment[]> {
        return await this.fileTreatmentRepository.find({where: {clinicalExaminationId}})
    }

    async addFile (file: Partial<FileTreatment>): Promise<FileTreatment> {
        return await this.fileTreatmentRepository.save(file)
    }

    // async updateFile (id:string, file:Partial<FileTreatment>): Promise<UpdateResult> {
    //     return await this.fileTreatmentRepository.update(id, file);
    // }

    async removeFile (id:string): Promise<DeleteResult> {
        return await this.fileTreatmentRepository.delete(id)
    }

}
