import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ItemsModule } from './items/items.module';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [ItemsModule],
  controllers: [ListsController],
  providers: [ListsService, PrismaService],
})
export class ListsModule {}
