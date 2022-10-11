import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from 'src/genre/entities/genre.entity';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('date')
  dateOfBirth: Date;

  @Column({
    length: 1000,
  })
  bio: string;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
