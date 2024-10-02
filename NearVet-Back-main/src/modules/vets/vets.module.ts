import { Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';
import { VetsRepository } from './vets.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vet } from './entities/vet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vet])],
  controllers: [VetsController],
  providers: [VetsService, VetsRepository]
})
export class VetsModule {}
