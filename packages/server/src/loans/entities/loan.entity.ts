import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.loans)
  user: User;

  @OneToOne(() => Book)
  @JoinColumn()
  book: Book;

  @CreateDateColumn()
  dateBegin: Date;

  @Column()
  dateEnd: Date;
}
