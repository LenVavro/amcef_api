import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
}
