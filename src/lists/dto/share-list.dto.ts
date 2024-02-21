import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShareListDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: User['id'];
}
