import { Module } from '@nestjs/common';
import { PendingController } from './pending.controller';
import { PendingService } from './pending.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pending } from './entities/pending.entity';
import { PendingRepository } from './pending.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Pending])],
  controllers: [PendingController],
  providers: [PendingService, PendingRepository]
})
export class PendingModule {}
