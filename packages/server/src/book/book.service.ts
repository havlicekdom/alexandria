import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { In, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  private async getAuthorById(id: string) {
    return await this.authorRepository.findOneBy({ id });
  }

  private async getGenresByIdList(ids: string[]) {
    if (!ids) return [];

    return await this.genreRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(createBookDto: CreateBookDto) {
    const author = await this.getAuthorById(createBookDto.authorId);
    const genres = await this.getGenresByIdList(createBookDto.genreIds);
    const toSave = Object.assign(createBookDto, {
      author,
      genres,
    });

    return await this.bookRepository.save(toSave);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findLatest() {
    return await this.bookRepository.find({
      relations: {
        author: true,
        genres: true,
      },
      order: {
        created: 'DESC',
      },
      take: 5,
    });
  }

  async findOne(id: string) {
    return await this.bookRepository.findOneBy({ id });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const toUpdate = await this.findOne(id);
    const author = await this.getAuthorById(updateBookDto.authorId);
    const genres = await this.getGenresByIdList(updateBookDto.genreIds);
    const toSave = Object.assign(toUpdate, updateBookDto, {
      author,
      genres,
    });

    return await this.bookRepository.save(toSave);
  }

  async remove(id: string) {
    return await this.bookRepository.delete({ id });
  }
}
