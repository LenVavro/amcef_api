import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @ApiOperation({ description: 'User registration' })
  registration(@Body() body: RegistrationDto) {
    return this.authService.registration(body);
  }

  @Post('/login')
  @ApiOperation({ description: 'User login' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
