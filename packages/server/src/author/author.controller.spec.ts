import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { createMockAuthor } from './mocks';
import { mockBook } from 'src/book/mocks';
import { mockGenre } from 'src/genre/mocks';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorController', () => {
  let controller: AuthorController;

  const mockAuthor = createMockAuthor(mockBook, mockGenre);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockAuthor),
            findAll: jest.fn().mockResolvedValue([mockAuthor]),
            findOne: jest.fn().mockResolvedValue(mockAuthor),
            update: jest.fn((id, updateAuthorDto) =>
              Promise.resolve({
                ...mockAuthor,
                ...updateAuthorDto,
              }),
            ),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return new author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: mockAuthor.name,
        bio: mockAuthor.bio,
        dateOfBirth: mockAuthor.dateOfBirth.toISOString().slice(0, 10),
        genreIds: [mockGenre.id],
        bookIds: [mockBook.id],
      };

      await expect(controller.create(createAuthorDto)).resolves.toEqual(
        mockAuthor,
      );
    });
  });

  describe('findAll', () => {
    it('should return list of all authors', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockAuthor]);
    });
  });

  describe('findOne', () => {
    it('should return one author', async () => {
      await expect(controller.findOne(mockAuthor.id)).resolves.toEqual(
        mockAuthor,
      );
    });
  });

  describe('update', () => {
    it('should update and return updated author', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Test updated name',
      };

      await expect(
        controller.update(mockAuthor.id, updateAuthorDto),
      ).resolves.toEqual({
        ...mockAuthor,
        ...updateAuthorDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove one author', async () => {
      await expect(controller.remove(mockAuthor.id)).resolves.toBeTruthy();
    });
  });
});
