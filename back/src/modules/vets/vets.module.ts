import { Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';

@Module({
  controllers: [VetsController],
  providers: [VetsService],
})
export class VetsModule {}
