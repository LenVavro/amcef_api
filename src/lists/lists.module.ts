import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  controllers: [ListsController],
  providers: [ListsService, PrismaService],
})
export class ListsModule {}
