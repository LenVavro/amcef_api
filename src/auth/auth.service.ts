import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthPayloadEntity } from './entity/auth-payload.entity';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registration({ email, password }: RegistrationDto) {
    const isEmailFree =
      (await this.prisma.user.count({
        where: { email },
      })) === 0;

    if (!isEmailFree) {
      throw new NotFoundException('Email is already used. Please Login.');
    }

    try {
      const { id } = await this.prisma.user.create({
        data: { email, password },
        select: { id: true },
      });
      return this._generateResponse({ id });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      select: { password: true, id: true },
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    return this._generateResponse({ id: user.id });
  }

  private _generateResponse(data: AuthPayloadEntity): AuthEntity {
    return {
      accessToken: this.jwtService.sign(data),
    };
  }
}
