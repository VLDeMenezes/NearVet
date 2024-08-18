import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';

@Module({
  imports: [UsersModule, PetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
