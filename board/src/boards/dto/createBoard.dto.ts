import { IsNotEmpty } from 'class-validator'; // 유효성 검사 파이프

// class를 사용하는 이유
// class 는 interface와 다른게 런타임에서 작동하기 떄문에 파이프 같은 기능을 이용할때 유용하기 때문
export class createBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
