import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFlagDto } from './dto/create-flag.dto';

@Injectable()
export class FlagsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.flag.findMany();
  }

  async create(createFlagDto: CreateFlagDto) {
    return this.prisma.flag.create({
      data: createFlagDto,
    });
  }
}
