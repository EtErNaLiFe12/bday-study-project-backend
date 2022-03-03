import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { encodePassword } from "src/utils/bcrypt";
import { RegisterDto } from "./dto/register.dto";
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // All users
  async getAllUsers() : Promise<any> {
    const res = await this.prisma.user.findMany({
      select: 
        {
          id : true,
          username: true,
          email: true,
          reg_dt: true,
        }
    });
    return res;
  }
  
  // single user
  async getUser(id: number): Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        id : Number(id)
      },
      select: {
        id: true,
        username: true,
        email: true,
        reg_dt: true,
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