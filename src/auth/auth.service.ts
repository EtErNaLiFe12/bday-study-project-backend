import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import { PrismaService } from './../prisma/prisma.service'
import { AuthResponseDto } from './dto/auth.dto';

// Injectable - provider가 controller, service 등 의존성들을 nest core가 등록 할 수 있도록함.
@Injectable()
export class AuthService {
  // dependency 주입
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    
  async login(email: string, password: string): Promise<AuthResponseDto> {
    
    const user = await this.prisma.user.findUnique({ where: { email: email }});
    // request한 password와 저장된 password간 비교(bcrypt 사용)
    const passwordValid = comparePasswords(password, user.password);

    if(!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    } else if (passwordValid) {
      console.log('User Validation Success!')
      return {
        accessToken: this.jwtService.sign({ userId: user.id.toString() }),
        userId: user.id.toString(),
      }
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  // user 유효성검사
    validateUser(userId: string) {
    const res = this.prisma.user.findUnique({ where: { id: BigInt(userId) } });
    return res;
  }
}
