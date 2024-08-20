import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  getUsersService(page: number, limit: number) {
    return this.usersRepository.getUsersRepository(page, limit);
  }
  
  getUsersByEmailService(id: string) {
    return this.usersRepository.getUserByEmailRepository(id);
  }

  getUsersByIdService(id: string) {
    return this.usersRepository.getUserByIdRepository(id);
  }

  createUserService(createUserDto: CreateUserDto) {
    return this.usersRepository.createUserRepository(createUserDto);
  }

  updateUserService(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUserRepository(id, updateUserDto);
  }

  removeUserService(id: string) {
    return this.usersRepository.removeUserRepository(id);
  }

  unsubscribeUserService(email: string){
    return this.usersRepository.unsubscribeUserRepository(email);
  }
}
