import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'create product' })
  @ApiResponse({ status: 200, type: Product })
  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productsService.createProduct(productDto);
  }

  @ApiOperation({ summary: 'get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  getAll() {
    return this.productsService.getAllProducts();
  }

  @ApiParam({ example: '1', description: 'product id', name: 'id' })
  @ApiOperation({ summary: 'get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  getTownById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @ApiParam({ example: '1', description: 'product id', name: 'id' })
  @ApiOperation({ summary: 'delete product by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteTownById(@Param('id') id: number) {
    return this.productsService.removeProductById(id);
  }
}
