import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genre/entities/genre.entity';
import { In, Repository } from 'typeorm';

import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  private async getGenresByIdList(ids: string[]): Promise<Genre[]> {
    if (!ids) return [];

    return await this.genreRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  private async getBooksByIdList(ids: string[]): Promise<Book[]> {
    if (!ids) return [];

    return await this.bookRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(createAuthorDto: CreateAuthorDto) {
    const genres = await this.getGenresByIdList(createAuthorDto.genreIds);
    const books = await this.getBooksByIdList(createAuthorDto.bookIds);

    const toSave = Object.assign(createAuthorDto, {
      genres,
      books,
    });

    return await this.authorRepository.save(toSave);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: string) {
    return await this.authorRepository.findOneBy({ id });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const genres = await this.getGenresByIdList(updateAuthorDto.genreIds);
    const books = await this.getBooksByIdList(updateAuthorDto.bookIds);
    const toUpdate = await this.findOne(id);

    const toSave = Object.assign(toUpdate, updateAuthorDto, {
      genres,
      books,
    });

    return await this.authorRepository.save(toSave);
  }

  async remove(id: string) {
    return await this.authorRepository.delete({ id });
  }
}
