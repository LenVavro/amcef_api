import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  list(@Param('id') id: string) {
    return this.listsService.list({ id });
  }

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.createList(createListDto);
  }

  @Post('/:id/share')
  share(@Param('id') id: string, @Body() shareListDto: ShareListDto) {
    return this.listsService.shareList(id, shareListDto);
  }
}
