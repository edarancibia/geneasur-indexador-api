import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import ApproveUserDto from './dtos/approveUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.userService.createUser(
      user.name,
      user.lastname,
      user.email,
      user.password,
    );
  }

  @Patch('/approve-user')
  async approve(@Body() bodyData: ApproveUserDto) {
    return await this.userService.approveUser(bodyData.penddingUserId, bodyData.approverUserId);
  }

  @Get('/pending')
  async getPendding() {
    return this.userService.getPendingApprovals();
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
