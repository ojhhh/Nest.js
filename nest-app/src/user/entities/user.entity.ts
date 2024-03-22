import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity 데코레이터를 사용하여 이 클래스가 데이터베이스 테이블에 매핑되는 엔티티임을 선언
// 데코레이터에 테이블 이름을 명시적으로 지정하지 않으면 클래스 이름을 카멜 케이스로 자동 변환하여 테이블 이름으로 사용
// 단점으로 테이블 이름 간의 연결을 코드에서 직접 추적해야 하기 때문에 관리 포인트가 늘어날 수 있음
@Entity()
export class User {
  // @PrimaryGeneratedColumn 데코레이터는 이 필드가 기본 키이며 자동으로 생성되는 값을 의미
  @PrimaryGeneratedColumn()
  id: number;
  // @Column 데코레이터는 일반 컬럼을 의미
  // @Column({ unique: true }) 이런식으로도 중복을 방지 할 수 있음
  @Column()
  username: string;

  @Column()
  password: string;
}
