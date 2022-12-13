import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesService } from '../categories/categories.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private categoryService: CategoriesService,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(dto);
    const categories = [];
    for (let i = 0; i < dto.categoryId.length; i++) {
      categories.push(
        (await this.categoryService.getCategoryById(dto.categoryId[i])).id,
      );
    }
    await product.$set('categories', categories);
    product.categories = categories;
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll({
      include: { all: true },
    });
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  async removeProductById(id: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    product.destroy();
  }

  async addCategory(dto: AddCategoryDto) {
    const product = await this.productRepository.findByPk(dto.productId);
    const category = await this.categoryService.getCategoryByName(dto.name);

    if (product && category) {
      await product.$add('category', category.id);
      return dto;
    }
    throw new HttpException('error', HttpStatus.NOT_FOUND);
  }

  async removeCategory(dto: AddCategoryDto) {
    const product = await this.productRepository.findByPk(dto.productId);
    const category = await this.categoryService.getCategoryByName(dto.name);
    if (product && category) {
      await product.$remove('category', category.id);
      return dto;
    }
    throw new HttpException('error', HttpStatus.NOT_FOUND);
  }
}
