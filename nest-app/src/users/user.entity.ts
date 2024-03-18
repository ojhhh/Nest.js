import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity 데코레이터를 사용하여 이 클래스가 데이터베이스 테이블에 매핑되는 엔티티임을 선언
@Entity()
export class User {
  // @PrimaryGeneratedColumn 데코레이터는 이 필드가 기본 키이며 자동으로 생성되는 값을 의미
  @PrimaryGeneratedColumn()
  id: number;
  // @Column 데코레이터는 일반 컬럼을 의미
  @Column()
  username: string;

  @Column()
  password: string;
}
