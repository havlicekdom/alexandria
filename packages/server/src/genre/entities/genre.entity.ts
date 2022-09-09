import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Author } from 'src/author/entities/author.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  bio: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];

  @ManyToMany(() => Author, (author) => author.genres)
  authors: Author[];
}
