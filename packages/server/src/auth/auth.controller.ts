import { Controller, Delete, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/metadata/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() req) {
    return this.authService.login(req.user);
  }

  @Delete('/logout')
  logoutUser() {
    return;
  }
}
