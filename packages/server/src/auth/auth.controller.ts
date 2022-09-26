import { Controller, Delete, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/metadata/public.decorator';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: LoginDto,
  })
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
