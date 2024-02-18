import { Flag } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class FlagItemDto {
  @IsNotEmpty()
  @IsString()
  flagId: Flag['id'];
}
