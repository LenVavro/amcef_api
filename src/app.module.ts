import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './lists/items/items.module';
import { ListsModule } from './lists/lists.module';
import { PrismaModule } from './prisma/prisma.module';
import { FlagsModule } from './flags/flags.module';

@Module({
  imports: [ListsModule, ItemsModule, AuthModule, PrismaModule, FlagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
