import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../boards.model';

// 커스텀 파이프 만들기
// status는 Public 과 private만 올 수 있게 하기
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase(); // 입력받은 문자열을 대문자로 변경

    // true가 반환됬을때 boolean값이 반전되어 false
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    // status의 값이 public 또는 private 인지 검사
    const index = this.StatusOptions.indexOf(status);
    return index !== -1; // public 또는 private이 아닌 경우 index의 값이 -1이 되므로 false, public 또는 private인 경우 인덱스 번호가 반환되어 (0 또는 1) -1과 같지 않으므로 true
  }
}
