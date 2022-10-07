import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';

export enum BookFormat {
  Hardcover = 'Hardcover',
  Paperback = 'Paperback',
  Digital = 'Digital',
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: BookFormat,
    default: BookFormat.Digital,
  })
  format: BookFormat;

  @Column()
  releaseYear: number;

  @Column({
    length: 1000,
  })
  description: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[];
}
