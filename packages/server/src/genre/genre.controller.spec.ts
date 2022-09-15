import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { createMockGenre } from './mocks';
import { mockAuthor } from 'src/author/mocks';
import { mockBook } from 'src/book/mocks';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

describe('GenreController', () => {
  let controller: GenreController;

  const mockGenre = createMockGenre(mockAuthor, mockBook);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [
        {
          provide: GenreService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockGenre),
            findAll: jest.fn().mockResolvedValue([mockGenre]),
            findOne: jest.fn().mockResolvedValue(mockGenre),
            update: jest.fn((id, updateGenreDto) =>
              Promise.resolve({
                ...mockGenre,
                ...updateGenreDto,
              }),
            ),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<GenreController>(GenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return new genre', async () => {
      const createGenreDto: CreateGenreDto = {
        name: mockGenre.name,
        bio: mockGenre.bio,
      };

      await expect(controller.create(createGenreDto)).resolves.toEqual(
        mockGenre,
      );
    });
  });

  describe('findAll', () => {
    it('should return list of all genres', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockGenre]);
    });
  });

  describe('findOne', () => {
    it('should return one genre', async () => {
      await expect(controller.findOne(mockGenre.id)).resolves.toEqual(
        mockGenre,
      );
    });
  });

  describe('update', () => {
    it('should update and return updated genre', async () => {
      const updateGenreDto: UpdateGenreDto = {
        name: 'Test updated name',
      };

      await expect(
        controller.update(mockGenre.id, updateGenreDto),
      ).resolves.toEqual({
        ...mockGenre,
        ...updateGenreDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove one genre', async () => {
      await expect(controller.remove(mockGenre.id)).resolves.toBeTruthy();
    });
  });
});
