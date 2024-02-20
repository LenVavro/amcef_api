import { User } from '@prisma/client';

export class AuthPayloadEntity {
  id: User['id'];
}
