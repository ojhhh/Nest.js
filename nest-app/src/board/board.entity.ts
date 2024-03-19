import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  writer: string;

  @Column()
  isUsed: boolean;
}
