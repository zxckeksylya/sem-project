import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficeDto {
  @ApiProperty({ example: 'office', description: 'name of office' })
  readonly name: string;

  @ApiProperty({ example: '1', description: 'id of town' })
  readonly townId: number;
}
