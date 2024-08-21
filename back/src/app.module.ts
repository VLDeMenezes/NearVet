import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/typeorm"
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthGlobalModule } from './modules/authGlobal/authGlobal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
      }),
   TypeOrmModule.forRootAsync({ 
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => configService.get("typeorm"), 
      }),

      // modulo para generar los token
      JwtModule.register({
        global: true,
        signOptions: {expiresIn : "1h"},
        secret: process.env.JWT_SECRET,
      }),

      AuthGlobalModule, UsersModule, PetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
