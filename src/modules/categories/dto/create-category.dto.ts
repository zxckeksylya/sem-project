import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'category', description: 'name of category' })
  readonly name: string;
}
