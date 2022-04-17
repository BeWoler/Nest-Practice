import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import { UserRequestDto } from './dtos/user.request.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async registration(
    @Body() body: UserRequestDto,
  ): Promise<GetUserResponseDto> {
    return this.userService.registration(body);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<GetUserResponseDto> {
    return this.userService.getUserById(id);
  }

  @Get()
  async getUsers(): Promise<GetUsersResponseDto> {
    return this.userService.getUsers();
  }
}
