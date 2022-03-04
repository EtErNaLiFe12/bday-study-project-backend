import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthDto {
  @ApiProperty({ description: '이메일'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호'})
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  userId: string;
}