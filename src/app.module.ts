import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './lists/items/items.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [ListsModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
