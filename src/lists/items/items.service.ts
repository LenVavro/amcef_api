import { Injectable } from '@nestjs/common';
import { List, ListItem, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { FlagItemDto } from './dto/flag-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async items(listId: List['id']) {
    return this.prisma.listItem.findMany({
      where: { listId },
      include: { ListItemFlag: true },
    });
  }

  async create(
    listId: List['id'],
    userId: User['id'],
    createItemDto: CreateItemDto,
  ) {
    return this.prisma.listItem.create({
      data: { ...createItemDto, listId, userId },
    });
  }

  async flag(itemId: ListItem['id'], flagItemDto: FlagItemDto) {
    return this.prisma.listItemFlag.create({
      data: { ...flagItemDto, listItemId: itemId },
    });
  }
}
