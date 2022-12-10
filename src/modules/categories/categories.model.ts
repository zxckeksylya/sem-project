import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product } from '../products/products.model';
import { ProductCategory } from '../product-categories/product-category.model';

interface CategoryCreationAttrs {
  name: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'Category', description: 'name of category' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[];
}
