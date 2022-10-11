import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import mockRepo from 'src/utils/mockRepo';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { createMockAuthor } from './mocks';
import { mockBook } from 'src/book/mocks';
import { mockGenre } from 'src/genre/mocks';

describe('AuthorService', () => {
  let service: AuthorService;
  let authorRepo: Repository<Author>;

  const mockAuthor = createMockAuthor(mockBook, mockGenre);
  const mockedAuthorRepository = mockRepo([mockAuthor], mockAuthor);
  const mockedBookRepository = mockRepo([mockBook], mockBook);
  const mockedGenreRepository = mockRepo([mockGenre], mockGenre);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
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

    service = module.get<AuthorService>(AuthorService);
    authorRepo = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new author', async () => {
      const newAuthor = {
        name: mockAuthor.name,
        bio: mockAuthor.bio,
        dateOfBirth: mockAuthor.dateOfBirth.toISOString().slice(0, 10),
        genreIds: [],
        bookIds: [],
      };
      await service.create(newAuthor);
      const saveSpy = jest.spyOn(authorRepo, 'save');
      expect(saveSpy).toHaveBeenCalledWith(newAuthor);
    });
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      const authors = await service.findAll();

      expect(authorRepo.find).toHaveBeenCalled();
      expect(authors).toEqual([mockAuthor]);
    });
  });

  describe('findOne', () => {
    it('should return author with provided ID', async () => {
      const author = await service.findOne(mockAuthor.id);

      expect(authorRepo.findOne).toHaveBeenCalled();
      expect(author).toEqual(mockAuthor);
    });
  });

  describe('update', () => {
    it('should return updated author with provided ID', async () => {
      const newName = 'Test updated author';
      await service.update(mockAuthor.id, {
        name: newName,
      });
      const saveSpy = jest.spyOn(authorRepo, 'save');

      expect(saveSpy).toHaveBeenCalledWith({
        ...mockAuthor,
        name: newName,
      });
    });
  });

  describe('remove', () => {
    it('should delete author with provided ID', async () => {
      await service.remove(mockAuthor.id);

      expect(authorRepo.delete).toHaveBeenCalledWith({ id: mockAuthor.id });
    });
  });
});
