import { Injectable } from '@nestjs/common';
import { List, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateListDto } from './dto/create-list.dto';
import { ShareListDto } from './dto/share-list.dto';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async lists(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ListWhereUniqueInput;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithRelationInput;
  }) {
    return this.prisma.list.findMany(params);
  }

  async list(where: Prisma.ListWhereUniqueInput) {
    return this.prisma.list.findUnique({
      where,
      include: {
        ListItem: { include: { ListItemFlag: true } },
        UserList: {
          select: { userId: true, createdAt: true, updatedAt: true },
        },
      },
    });
  }

  async create(createListDto: CreateListDto) {
    return this.prisma.list.create({ data: createListDto });
  }

  async share(listId: List['id'], shareListDto: ShareListDto) {
    return this.prisma.userList.create({
      data: { listId, userId: shareListDto.userId },
    });
  }
}
