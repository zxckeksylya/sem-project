import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Category } from '../categories/categories.model';
import { ProductCategory } from '../product-categories/product-category.model';

interface ProductCreationAttrs {
  name: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Product', description: 'name of product' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '1.22', description: 'price of product' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];
}
