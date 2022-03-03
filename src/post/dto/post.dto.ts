import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class PostDto {
  
  @ApiProperty({ description: '관리번호'})
  @IsString()
  @IsNotEmpty()
  readonly mng_no: string;

  @ApiProperty({ description: '닉네임'})
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @ApiProperty({ description: '제목'})
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: '내용'})
  @IsEmail()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ description: 'post 아이디'})
  @IsString()
  @IsNotEmpty()
  readonly postId: number;
}

export class PostUpdateDto {
  
  @ApiProperty({ description: '관리번호'})
  @IsString()
  @IsNotEmpty()
  readonly mng_no: string;

  @ApiProperty({ description: '닉네임'})
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @ApiProperty({ description: '제목'})
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: '내용'})
  @IsEmail()
  @IsNotEmpty()
  readonly content: string;

}

export class PostResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: '관리번호'})
  @IsString()
  @IsNotEmpty()
  readonly mng_no: string;

  @ApiProperty({ description: '닉네임'})
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @ApiProperty({ description: '제목'})
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: '내용'})
  @IsEmail()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ description: 'post 아이디'})
  @IsString()
  @IsNotEmpty()
  readonly postId: number;

  @ApiProperty({ description: '생성 날짜' })
  @IsDate()
  @IsNotEmpty()
  readonly crt_dt: Date;

  @ApiProperty({ description: '수정 날짜' })
  @IsDate()
  @IsNotEmpty()
  readonly mod_dt: Date;

  // serialize를 위해 - 객체 직렬화 (객체를 리턴 시)
  constructor(userData) {
    this.id = userData.id.toString();
  }
}
