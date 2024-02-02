// 게시물 작성에 필요한 데이터 타입 정의
export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

// 게시글이 공개글인지 비밀글인지 판단
export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
