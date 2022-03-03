import { ApiProperty } from "@nestjs/swagger";

export class Auth {
  @ApiProperty()
  accessToken: string;
  userId: bigint;
}