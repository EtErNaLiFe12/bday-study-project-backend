import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import { PrismaService } from './../prisma/prisma.service'
import { Auth } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    
  async login(email: string, password: string): Promise<Auth> {
    
    const user = await this.prisma.user.findUnique({ where: { email: email }});
   
    if(!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Logic for compare password between password in Database and password from request
    const passwordValid = comparePasswords(password, user.password);

    if(passwordValid) {
      console.log('User Validation Success!')
      return {
        accessToken: this.jwtService.sign({ userId: user.id })
      }
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }
  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: BigInt(userId) } });
  }
}
