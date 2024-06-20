import {
  Controller,
  Get,
  Post,
  //Put,
  //Delete,
  //Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
//import { create } from 'domain';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(
    @Body()
    createUserDto: {
      name: string;
      username: string;
      email: string;
      password: string;
    },
  ): Promise<User> {
    const { name, username, email, password } = createUserDto;
    return this.usersService.createUser(name, username, email, password);
  }
  @Get()
  async signIn(
    @Body() createDto: { username: string; password: string },
  ): Promise<User> {
    const { username, password } = createDto;

    return this.usersService.signIn(username, password);
  }
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  // @Get(':id')
  // async getUserById(@Param('id') id: string): Promise<User | null> {
  //   return this.usersService.getUserById(Number(id));
  // }
  // @Put(':id')
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: { username: string; email: string },
  // ): Promise<User> {
  //   const { username, email } = updateUserDto;
  //   return this.usersService.updateUser(Number(id), username, email);
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<User> {
  //   return this.usersService.deleteUser(Number(id));
  // }
}
