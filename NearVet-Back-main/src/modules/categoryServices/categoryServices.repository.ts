import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "./entities/categoryService.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class CategoryServiceRepository {
    constructor (@InjectRepository(CategoryService) private categoryServiceRepository: Repository<CategoryService>) {}

    async getCategoryServices(): Promise<CategoryService[]> {
        return await this.categoryServiceRepository.find();
    }

    async getCategoryServiceById(id: string): Promise<CategoryService> {
        return await this.categoryServiceRepository.findOne({where: {id}})
    }

    async getCategoryServiceByCategory(category: string): Promise<CategoryService> {
        return await this.categoryServiceRepository.findOne({where: {categoryService: category}});
    }

    async createCategoryService(category: Partial<CategoryService>): Promise<CategoryService> {
        return await this.categoryServiceRepository.save(category);
    }
      
    async updateCategoryService(id: string, catSer: Partial<CategoryService>): Promise<UpdateResult> {
        return await this.categoryServiceRepository.update(id, catSer)
    } 
  
    async removeCategoryService(id: string): Promise<DeleteResult> {
        return await this.categoryServiceRepository.delete(id)
    }
}