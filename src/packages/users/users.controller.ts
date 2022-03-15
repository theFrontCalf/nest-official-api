import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpException,
} from '@nestjs/common';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(
    @Body() { userName, password }: { userName: string; password: string },
  ) {
    const user = await this.usersService.findOne({ userName, password });
    if (!user) {
      throw new HttpException('not found', 401);
    }

    const token = await this.usersService.generateJWT(user);
    return token;
  }
}
