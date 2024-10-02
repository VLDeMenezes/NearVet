import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Query} from '@nestjs/common';
import { FileTreatmentService } from './file-treatment.service';
import { FileTreatment } from './entities/file-treatment.entity';
import { ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("File Treatment")
@Controller('file-traetment')
export class FileTreatmentController {
  constructor(private readonly fileTreatmentService: FileTreatmentService) {}
 
  @Get()
  @ApiOperation({summary: 'devuleve todos los archivos'})
  async getFiles (): Promise<FileTreatment[]> {
    return await this.fileTreatmentService.getFiles()
  }
  
  @Get(":clinicalExaminationId")
  @ApiOperation({summary: 'devuleve los archivos de una Examinacion Clinica'})
  async getFileByTreatmentId (@Param("clinicalExaminationId") clinicalExaminationId:string): Promise<FileTreatment[]> {
    return await this.fileTreatmentService.getFileByTreatmentId(clinicalExaminationId)
  }

  @Post(":clinicalExaminationId")
  @ApiOperation({summary: "Agrega un nuevo archivo la examinación"})
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: `Debe subir el Archivo de Imagen`,
            schema: { type: 'object', properties: { file: {type: 'string',format: 'binary'}}}})
  async addFile (@Param("clinicalExaminationId", ParseUUIDPipe) clinicalExaminationId: string, 
                @UploadedFile(new ParseFilePipe({
                  validators: [
                    new MaxFileSizeValidator({
                      maxSize: 300000000,
                      message: 'El Archivo debe ser menor a 300Mb',
                    }),
                    new FileTypeValidator({
                      fileType: /.*/,
                    }),
                  ],
                }))
  file: Express.Multer.File): Promise<FileTreatment> {
    return await this.fileTreatmentService.addFile(clinicalExaminationId, file)
  }

  @Delete(":id")
  @ApiOperation({summary: "Elimina un archivo de una examinación"})
  async removeFile (@Param("id", ParseUUIDPipe) id:string): Promise<string> {
    return await this.fileTreatmentService.removeFile(id)  
  }
}
