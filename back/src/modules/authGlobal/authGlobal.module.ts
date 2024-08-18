import { Module } from '@nestjs/common';
import { AuthGlobalService } from './authGlobal.service';
import { AuthGlobalController } from './authGlobal.controller';

@Module({
  controllers: [AuthGlobalController],
  providers: [AuthGlobalService],
})
export class AuthGlobalModule {}
