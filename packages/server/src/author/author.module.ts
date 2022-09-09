import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author } from './entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Genre, Book])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
