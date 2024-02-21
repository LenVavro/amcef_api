import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FlagItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  flagId: string;
}
