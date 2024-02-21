import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShareListDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;
}
