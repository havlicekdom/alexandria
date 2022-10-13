import { Test, TestingModule } from '@nestjs/testing';
import { mockAuthor } from 'src/author/mocks';
import { mockGenre } from 'src/genre/mocks';
import mockRepo from 'src/utils/mockRepo';
import { Repository } from 'typeorm';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { createMockBook } from './mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';

describe('BookService', () => {
  let service: BookService;
  let bookRepo: Repository<Book>;

  const mockBook = createMockBook(mockAuthor, mockGenre);
  const mockedBookRepository = mockRepo([mockBook], mockBook);
  const mockedAuthorRepository = mockRepo([mockAuthor], mockAuthor);
  const mockedGenreRepository = mockRepo([mockGenre], mockGenre);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
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

    service = module.get<BookService>(BookService);
    bookRepo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new book', async () => {
      const newBook = {
        name: mockBook.name,
        format: mockBook.format,
        releaseYear: mockBook.releaseYear,
        description: mockBook.description,
        authorId: mockAuthor.id,
        genreIds: [mockGenre.id],
      };
      await service.create(newBook);
      const saveSpy = jest.spyOn(bookRepo, 'save');
      expect(saveSpy).toHaveBeenCalledWith(newBook);
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const books = await service.findAll();

      expect(bookRepo.find).toHaveBeenCalled();
      expect(books).toEqual([mockBook]);
    });
  });

  describe('findLoanble', () => {
    it('should return loanble books', async () => {
      const books = await service.findLoanable();

      expect(bookRepo.createQueryBuilder).toHaveBeenCalled();
      expect(books).toEqual([mockBook]);
    });
  });

  describe('findLatest', () => {
    it('should return 5 latest books', async () => {
      const books = await service.findLatest();

      expect(bookRepo.find).toHaveBeenCalled();
      expect(books).toEqual([mockBook]);
    });
  });

  describe('findOne', () => {
    it('should return book with provided ID', async () => {
      const book = await service.findOne(mockBook.id);

      expect(bookRepo.findOne).toHaveBeenCalled();
      expect(book).toEqual(mockBook);
    });
  });

  describe('update', () => {
    it('should return updated book with provided ID', async () => {
      const newName = 'Test updated book';
      const saveSpy = jest.spyOn(bookRepo, 'save');
      await service.update(mockBook.id, {
        name: newName,
      });

      expect(saveSpy).toHaveBeenCalledWith({
        ...mockBook,
        name: newName,
      });
    });
  });

  describe('remove', () => {
    it('should delete book with provided ID', async () => {
      await service.remove(mockBook.id);

      expect(bookRepo.delete).toHaveBeenCalledWith({ id: mockBook.id });
    });
  });
});
