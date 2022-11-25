import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/metadata/public.decorator';
import { getOriginFromHeaders } from 'src/utils/headers';
import {
  CreateUserDto,
  UpdateUserDto,
  ResetUserPasswordDto,
  ChangeUserPasswordDto,
  ForgottenPasswordDto,
} from './dto';
import { UserService } from './user.service';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/profile')
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiBody({ type: ChangeUserPasswordDto })
  @Patch('/change-password')
  async changePassword(@Request() req, @Body() dto: ChangeUserPasswordDto) {
    const { oldPassword, newPassword } = dto;

    return await this.userService.changePassword(
      req.user.id,
      oldPassword,
      newPassword,
    );
  }

  @Public()
  @ApiBody({ type: ResetUserPasswordDto })
  @Patch('/reset-password')
  async resetPassword(@Body() dto: ResetUserPasswordDto) {
    return await this.userService.resetPassword(dto);
  }

  @Public()
  @ApiBody({ type: ForgottenPasswordDto })
  @Patch('/forgotten-password')
  async forgottenPassword(
    @Body() dto: ForgottenPasswordDto,
    @Headers() headers,
  ) {
    const { email } = dto;
    const origin = getOriginFromHeaders(headers);

    return await this.userService.forgottenPassword(email, origin);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @Public()
  @ApiBody({ type: CreateUserDto })
  @Post('/')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
}
