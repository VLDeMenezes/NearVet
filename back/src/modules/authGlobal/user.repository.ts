import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserRole } from "./entities/userRole.entity";

@Injectable()
export class UserRepository {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(User) private userRoleRepository: Repository<UserRole>) {}

    async getUserByEmail (email: string): Promise<User> {
        return await this.userRepository.findOneBy({email})
    }

    async getRoleByName (name:string): Promise<UserRole> {
        return this.userRoleRepository.findOneBy({role:name})
    }

    async create (user: Omit<User, "id">) : Promise<User> {
        return await this.userRepository.save(user)
    }
}