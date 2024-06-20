import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure correct path to PrismaService
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    name: string,
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return await this.prisma.prismaClient.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error.code === '500') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async signIn(username: string, password: string): Promise<User> {
    const user = this.prisma.prismaClient.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const passwordValid = await bcrypt.compare(password, (await user).password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.prismaClient.user.findMany();
  }

  // async getUserById(id: number): Promise<User | null> {
  //   return this.prisma.prismaClient.user.findUnique({
  //     where: { id },
  //   });
  // }

  // async updateUser(id: number, username: string, email: string): Promise<User> {
  //   return this.prisma.prismaClient.user.update({
  //     where: { id },
  //     data: {
  //       username,
  //       email,
  //     },
  //   });
  // }

  // async deleteUser(id: number): Promise<User> {
  //   return this.prisma.prismaClient.user.delete({
  //     where: { id },
  //   });
  // }
}
