import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { speciesRepository } from './species.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/specie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
  controllers: [SpeciesController],
  providers: [SpeciesService, speciesRepository]
})
export class SpeciesModule {}
