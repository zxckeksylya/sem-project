import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'create category' })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }

  @ApiOperation({ summary: 'get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAll() {
    return this.categoriesService.getAllCategories();
  }

  @ApiParam({ example: '1', description: 'category id', name: 'id' })
  @ApiOperation({ summary: 'get category by id' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  getTownById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiParam({ example: '1', description: 'category id', name: 'id' })
  @ApiOperation({ summary: 'delete category by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteTownById(@Param('id') id: number) {
    return this.categoriesService.removeCategoryById(id);
  }
}
