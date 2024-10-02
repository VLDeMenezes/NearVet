/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';
import { Role } from './roles/roles.enum';

@Injectable()
export class UsersRepository {
  
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
  ) {}

  async getUsersRepository(page: number, limit: number) {
    return await this.usersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getRolesUsersRepository() {
    return await this.userRoleRepository.find();
  }

  async getRolesUsersByRoleRepository(role:Role) {
    return await this.userRoleRepository.findOneBy({ role });
  }

  async getUserByEmailRepository(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: {
        role: true,
        pets: true,
      }
    });
  }

  async getUserByDniRepository(dni: number) {
    return await this.usersRepository.findOne({ where: { dni },
      relations: {
        role: true,
        pets: true,
      } });
  }

  async getUsersByRoleRepository(role: Role) {
    return await this.usersRepository.find({
      where: { role: {role} },
      relations: { role: true, pets:true },
    });
  }

  async getUserByIdRepository(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: {
        role: true,
        pets: true,
      },
    });
  }

  async createUserRepository(user: Partial<User>): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async updateUserRepository(id: string, user: Partial<User>) {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOneBy({ id });
  }

  async removeUserRepository(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.delete(user);
    return user;
  }

  async unsubscribeUserRepository(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.save(user);
    return user;
  }

}
