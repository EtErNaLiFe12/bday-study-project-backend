import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { comparePasswords } from 'src/utils/bcrypt';
import { PrismaService } from './../prisma/prisma.service'
import { AuthResponseDto } from './dto/auth.dto';

// Injectalbe - provider가 controller, service 등 의존성들을 nest core가 등록 할 수 있도록함.
@Injectable()
export class AuthService {
  // dependency 주입
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    
  async login(email: string, password: string): Promise<AuthResponseDto> {
    
    // request 된 email을 찾고 없으면 exception.
    const user = await this.prisma.user.findUnique({ where: { email: email }});
   
    if(!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // request한 password와 저장된 password간 비교(bcrypt 사용)
    const passwordValid = comparePasswords(password, user.password);

    if(passwordValid) {
      console.log('User Validation Success!')
      return {
        accessToken: this.jwtService.sign({ userId: user.id }),
        userId: user.id,
      }
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }
  async validateUser(id: string) : Promise<User> {
    return await this.prisma.user.findUnique({ where: { id: BigInt(id) } });
  }
}
