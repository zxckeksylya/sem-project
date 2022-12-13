import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.create(dto);
    return category;
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });
    return category;
  }

  async removeCategoryById(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });
    category.destroy();
  }

  async getCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        name: name,
      },
    });
    return category;
  }
}
