import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/test')
  async test() {
    return { message: 'UserController is working!' };
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.createUser(
      user.username,
      user.email,
      user.password,
    );
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    console.log(id)
    return this.userService.findById(id);
  }
}
