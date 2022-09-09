import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from 'src/genre/entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    return await this.genreRepository.save(createGenreDto);
  }

  async findAll() {
    return await this.genreRepository.find();
  }

  async findOne(id: string) {
    return await this.genreRepository.findOneBy({ id });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const toUpdate = await this.findOne(id);
    const updated = Object.assign(toUpdate, updateGenreDto);

    return await this.genreRepository.save(updated);
  }

  async remove(id: string) {
    await this.genreRepository.delete({ id });
  }
}
