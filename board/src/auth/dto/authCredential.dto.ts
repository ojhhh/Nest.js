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
  // /^[a-zA-Z0-9]+$/ 여기서 +를 *로 잘못 입력하였는데 +가 아닌 *를 입력하게되면 해당 문자열이 0회 이상 반복되는 문자열과 매칭되기 때문에 빈 문자열도 매치될 수 있다고함
  // +는 1회 이상 반복되는 문자열과 매칭되기 때문에 빈 문자열이 올 수 없다고 함
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'password only use english and number',
  })
  password: string;
}
