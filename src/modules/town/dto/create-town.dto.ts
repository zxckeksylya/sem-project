import { ApiProperty } from '@nestjs/swagger';

export class CreateTownDto {
  @ApiProperty({ example: 'Vitebsk', description: 'name of town' })
  readonly name: string;
}
