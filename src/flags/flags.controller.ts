import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateFlagDto } from './dto/create-flag.dto';
import { FlagsService } from './flags.service';

@Controller('flags')
export class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}

  @Get()
  @ApiOperation({ description: 'Get all flags' })
  findAll() {
    return this.flagsService.findAll();
  }

  @Post()
  @ApiOperation({ description: 'Create flag' })
  create(@Body() body: CreateFlagDto) {
    return this.flagsService.create(body);
  }
}
