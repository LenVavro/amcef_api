import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [ItemsModule, PrismaModule],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
