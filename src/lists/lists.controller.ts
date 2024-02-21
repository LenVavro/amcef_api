import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
  @ApiOperation({ description: 'Get all created todo lists' })
  findAll() {
    return this.listsService.lists();
  }

  @Get('/:listId')
  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get todo lists by ID' })
  list(@Param('listId') id: string) {
    return this.listsService.list({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create todo lists' })
  create(
    @Body() createListDto: CreateListDto,
    @Req() req: Request & { user: User },
  ) {
    return this.listsService.create(createListDto, req.user.id);
  }

  @Post('/:listId/share')
  @UseGuards(JwtAuthGuard, ListAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Add new user to todo list' })
  share(@Param('listId') id: string, @Body() shareListDto: ShareListDto) {
    return this.listsService.share(id, shareListDto);
  }
}
