import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';

export enum BookFormat {
  HARDCOVER = 'hardcover',
  PAPERBACK = 'paperback',
  DIGITAL = 'digital',
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: BookFormat,
    default: BookFormat.DIGITAL,
  })
  format: BookFormat;

  @Column()
  releaseYear: number;

  @Column()
  description: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[];
}
