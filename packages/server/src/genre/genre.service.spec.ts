import { Test, TestingModule } from '@nestjs/testing';
import { mockBook } from 'src/book/mocks';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';
import { createMockGenre } from './mocks';
import { mockAuthor } from 'src/author/mocks';
import mockRepo from 'src/utils/mockRepo';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

describe('GenreService', () => {
  let service: GenreService;
  let genreRepo: Repository<Genre>;

  const mockGenre = createMockGenre(mockAuthor, mockBook);
  const mockedAuthorRepository = mockRepo([mockAuthor], mockAuthor);
  const mockedBookRepository = mockRepo([mockBook], mockBook);
  const mockedGenreRepository = mockRepo([mockGenre], mockGenre);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockedAuthorRepository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockedBookRepository,
        },
        {
          provide: getRepositoryToken(Genre),
          useValue: mockedGenreRepository,
        },
      ],
    }).compile();

    service = module.get<GenreService>(GenreService);
    genreRepo = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new genre', async () => {
      const newGenre = {
        name: mockGenre.name,
        bio: mockGenre.bio,
      };
      await service.create(newGenre);
      const saveSpy = jest.spyOn(genreRepo, 'save');
      expect(saveSpy).toHaveBeenCalledWith(newGenre);
    });
  });

  describe('findAll', () => {
    it('should return all genres', async () => {
      const genres = await service.findAll();

      expect(genreRepo.find).toHaveBeenCalled();
      expect(genres).toEqual([mockGenre]);
    });
  });

  describe('findOne', () => {
    it('should return genre with provided ID', async () => {
      const genre = await service.findOne(mockGenre.id);

      expect(genreRepo.findOneBy).toHaveBeenCalled();
      expect(genre).toEqual(mockGenre);
    });
  });

  describe('update', () => {
    it('should return updated genre with provided ID', async () => {
      const newName = 'Test updated genre';
      await service.update(mockGenre.id, {
        name: newName,
      });
      const saveSpy = jest.spyOn(genreRepo, 'save');

      expect(saveSpy).toHaveBeenCalledWith({
        ...mockGenre,
        name: newName,
      });
    });
  });

  describe('remove', () => {
    it('should delete genre with provided ID', async () => {
      await service.remove(mockGenre.id);

      expect(genreRepo.delete).toHaveBeenCalledWith({ id: mockGenre.id });
    });
  });
});
