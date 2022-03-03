import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterDto, UserResponseDto } from './dto/register.dto';
import { UserService } from './user.service';


@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: '모든 유저 정보 조회', description: '모든 유저 정보 가져오기'})
   async getAllUsers() {
     return await this.userService.getAllUsers();
   }

  //  Param decorator로 get에 선언한 id를 가져온 후 id에 넣음 return 으로는 UserResponseDto 가져옴
   @Get('/:id')
   @UseGuards(JwtAuthGuard)
   @ApiOperation({ summary: '유저 한명의 정보 조회', description: '한명의 유저 정보 가져오기'})
   async getUser(@Param('id') id: number): Promise<UserResponseDto> {
      const result = await this.userService.getUser(id)
      return result;
   }

  @Post('/signup')
  @ApiOperation({ summary: '회원가입 API', description: '회원가입 실행' })
    async regUser(@Body() userInfo : RegisterDto): Promise<UserModel> { 
      const result = await this.userService.regUser(userInfo);
      return result;
  }
}

