import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FlagsController } from './flags.controller';
import { FlagsService } from './flags.service';

@Module({
  imports: [PrismaModule],
  controllers: [FlagsController],
  providers: [FlagsService],
})
export class FlagsModule {}
