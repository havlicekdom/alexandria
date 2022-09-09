import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/metadata/public.decorator';
import {
  CreateUserDto,
  UpdateUserDto,
  ResetUserPasswordDto,
  ChangeUserPasswordDto,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiBody({ type: ChangeUserPasswordDto })
  @Put('/change-password')
  async changePassword(@Request() req, @Body() dto: ChangeUserPasswordDto) {
    const { oldPassword, newPassword } = dto;

    return await this.userService.changePassword(
      req.user.id,
      oldPassword,
      newPassword,
    );
  }

  @ApiBody({ type: UpdateUserDto })
  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @Public()
  @ApiBody({ type: CreateUserDto })
  @Post('/')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Public()
  @ApiBody({ type: ResetUserPasswordDto })
  @Put('/')
  async resetPassword(@Body() dto: ResetUserPasswordDto) {
    const { email } = dto;

    return await this.userService.resetPassword(email);
  }
}
