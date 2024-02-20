import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListAccessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const listId = String(request.params.listId);
    const user = request.user as User;

    const isAuthorized =
      (await this.prisma.userList.count({
        where: { userId: user.id, listId },
      })) === 1;

    if (!isAuthorized) {
      throw new UnauthorizedException(
        "You don't have permission to access this list",
      );
    }

    return true;
  }
}
