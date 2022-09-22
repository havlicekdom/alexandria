import { Test, TestingModule } from '@nestjs/testing';
import { mockAuthor } from 'src/author/mocks';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { createMockBook } from './mocks';
import { mockGenre } from 'src/genre/mocks';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookController', () => {
  let controller: BookController;

  const mockBook = createMockBook(mockAuthor, mockGenre);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockBook),
            findAll: jest.fn().mockResolvedValue([mockBook]),
            findOne: jest.fn().mockResolvedValue(mockBook),
            update: jest.fn((id, updateBookDto) =>
              Promise.resolve({
                ...mockBook,
                ...updateBookDto,
              }),
            ),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return new book', async () => {
      const createBookDto: CreateBookDto = {
        name: mockBook.name,
        format: mockBook.format,
        releaseYear: mockBook.releaseYear,
        description: mockBook.description,
        authorId: mockAuthor.id,
        genreIds: [mockGenre.id],
      };

      await expect(controller.create(createBookDto)).resolves.toEqual(mockBook);
    });
  });

  describe('findAll', () => {
    it('should return list of all books', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockBook]);
    });
  });

  describe('findLatest', () => {
    it('should return list of 5 latest books', async () => {
      await expect(controller.findLatest()).resolves.toEqual([mockBook]);
    });
  });

  describe('findOne', () => {
    it('should return one book', async () => {
      await expect(controller.findOne(mockBook.id)).resolves.toEqual(mockBook);
    });
  });

  describe('update', () => {
    it('should update and return updated book', async () => {
      const updateBookDto: UpdateBookDto = {
        name: 'Test updated name',
      };

      await expect(
        controller.update(mockAuthor.id, updateBookDto),
      ).resolves.toEqual({
        ...mockBook,
        ...updateBookDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove one book', async () => {
      await expect(controller.remove(mockBook.id)).resolves.toBeTruthy();
    });
  });
});
