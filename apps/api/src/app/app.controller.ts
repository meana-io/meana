import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './domains/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
