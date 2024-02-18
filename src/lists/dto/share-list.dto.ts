import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShareListDto {
  @IsNotEmpty()
  @IsString()
  userId: User['id'];
}
