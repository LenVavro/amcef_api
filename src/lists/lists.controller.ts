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
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ListAccessGuard } from 'src/lists/list-access.guard';
import { CreateListDto } from './dto/create-list.dto';
import { ShareListDto } from './dto/share-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll() {
    return this.listsService.lists();
  }

  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @Get('/:listId')
  list(@Param('listId') id: string) {
    return this.listsService.list({ id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createListDto: CreateListDto,
    @Req() req: Request & { user: User },
  ) {
    return this.listsService.create(createListDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @Post('/:listId/share')
  share(@Param('listId') id: string, @Body() shareListDto: ShareListDto) {
    return this.listsService.share(id, shareListDto);
  }
}
