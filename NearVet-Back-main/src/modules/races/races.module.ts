import { Module } from '@nestjs/common';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';
import { RaceRepository } from './races.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './entitites/race.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  controllers: [RacesController],
  providers: [RacesService, RaceRepository]
})
export class RacesModule {}
