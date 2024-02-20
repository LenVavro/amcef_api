import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
  @Get('/:listId')
  list(@Param('listId') id: string) {
    return this.listsService.list({ id });
  }

  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @Post('/:listId/share')
  share(@Param('listId') id: string, @Body() shareListDto: ShareListDto) {
    return this.listsService.share(id, shareListDto);
  }
}
