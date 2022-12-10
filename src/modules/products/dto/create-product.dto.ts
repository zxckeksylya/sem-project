import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'product', description: 'name of product' })
  readonly name: string;

  @ApiProperty({ example: '1.11', description: 'price of product' })
  readonly price: number;

  readonly categoryId: number[];
}
