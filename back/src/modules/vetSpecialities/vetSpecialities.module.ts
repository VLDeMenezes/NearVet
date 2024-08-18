import { Module } from '@nestjs/common';
import { VetSpecialitiesService } from './vetSpecialities.service';
import { VetSpecialitiesController } from './vetSpecialities.controller';

@Module({
  controllers: [VetSpecialitiesController],
  providers: [VetSpecialitiesService],
})
export class VetSpecialitiesModule {}
