import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @ApiProperty({ description: '유저 이름'})
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: '이메일 주소'})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  readonly password: string;
}

export class UserResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: bigint;

  @ApiProperty({ description: '유저 이름'})
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: '이메일 주소'})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: '가입 일자'})
  @IsDate()
  @IsNotEmpty()
  readonly reg_dt: Date;

  constructor(userData) {
    this.id = userData.id.toString();
  }
}