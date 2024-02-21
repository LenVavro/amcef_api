import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { List, ListItem, User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ListAccessGuard } from 'src/lists/list-access.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { FlagItemDto } from './dto/flag-item.dto';
import { ItemsService } from './items.service';

@Controller('/lists/:listId/items')
@ApiParam({ name: 'listId', schema: { type: 'string' }, required: true })
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ description: 'Get all items in {listId} list' })
  items(@Param('listId') listId: List['id']) {
    return this.itemsService.items(listId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create new item in {listId} list' })
  create(
    @Param('listId') listId: List['id'],
    @Body() createItemDto: CreateItemDto,
    @Req() req: Request & { user: User },
  ) {
    return this.itemsService.create(listId, req.user.id, createItemDto);
  }

  @Post('/:itemId/flags')
  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Flag {itemId} item in with {flagId} flag' })
  @ApiParam({ name: 'itemId', schema: { type: 'string' }, required: true })
  flag(
    @Param('itemId') itemId: ListItem['id'],
    @Body() flagItemDto: FlagItemDto,
  ) {
    return this.itemsService.flag(itemId, flagItemDto);
  }
}
