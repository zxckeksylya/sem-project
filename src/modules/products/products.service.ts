import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(dto);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
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
}
