import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString() // 무조건 문자
  @MinLength(4) // 최소 길이
  @MaxLength(20) // 최대 길이
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영어랑 숫자만 가능한 유효성검사
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only use english and number',
  })
  password: string;
}
