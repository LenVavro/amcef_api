import { ApiProperty } from '@nestjs/swagger';
import { Flag } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class FlagItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  flagId: Flag['id'];
}
