import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { List } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { FlagItemDto } from './dto/flag-item.dto';
import { ItemsService } from './items.service';

@Controller('/lists/:listId/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  items(@Param('listId') listId: List['id']) {
    return this.itemsService.items(listId);
  }

  @Post()
  create(
    @Param('listId') listId: List['id'],
    @Body() createItemDto: CreateItemDto,
  ) {
    // TODO: userId
    return this.itemsService.create(listId, 'test_user', createItemDto);
  }

  @Post('/:itemId/flags')
  flag(@Param('itemId') itemId: List['id'], @Body() flagItemDto: FlagItemDto) {
    return this.itemsService.flag(itemId, flagItemDto);
  }
}
