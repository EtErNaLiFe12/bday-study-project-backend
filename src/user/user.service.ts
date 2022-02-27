import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { encodePassword } from "src/utils/bcrypt";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // All users
  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  
  // single user
  async getUser(id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id : BigInt(id),
      }
    });
  }

  // Register
  async regUser(data: RegisterDto) : Promise<User> {
    const res = await this.prisma.user.create({
      data: 
        {
          username: data.username,
          email: data.email,
          password: encodePassword(data.password),
        }, 
    })
    return res;
  }
}