import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { List, User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ListAccessGuard } from 'src/lists/list-access.guard';
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

  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Param('listId') listId: List['id'],
    @Body() createItemDto: CreateItemDto,
    @Req() req: Request & { user: User },
  ) {
    return this.itemsService.create(listId, req.user.id, createItemDto);
  }

  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @Post('/:itemId/flags')
  flag(@Param('itemId') itemId: List['id'], @Body() flagItemDto: FlagItemDto) {
    return this.itemsService.flag(itemId, flagItemDto);
  }
}
