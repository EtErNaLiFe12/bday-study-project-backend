import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()

// passport - 인증관련 - 토큰 또는 쿠기의 정보를 가져와 사용자 정보에 저장(serialize)한다. 
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에 bearer스키마에 담겨온 토큰 해석할 것
      secretOrKey: process.env.JWT_SECRET, // token signature을 verifying 해줌(암호 해독방식을 사용하기 위함)
    });
  }

  // payload에 userId가 존재 시 클라이언트 측 요청 req에 담긴 토큰이 유효한 토큰
  // 이라는 것이기 때문에 로그인이 됨

  async validate(payload: { userId: string }) {
    const user = await this.authService.validateUser(payload.userId);
    // user가 없을 경우
    if (!user) {
      throw new UnauthorizedException();
    }
    // user가 있을 경우
    return user;
  }
}