import { Test, TestingModule } from '@nestjs/testing';
import { mockUser } from 'src/user/mocks';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { createMockLoan } from './mocks';
import { mockBook } from 'src/book/mocks';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

describe('LoansController', () => {
  let controller: LoansController;

  const mockLoan = createMockLoan(mockUser, mockBook);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [
        {
          provide: LoansService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockLoan),
            findAll: jest.fn().mockResolvedValue([mockLoan]),
            findOne: jest.fn().mockResolvedValue(mockLoan),
            update: jest.fn((id, updateLoanDto) =>
              Promise.resolve({
                ...mockLoan,
                ...updateLoanDto,
              }),
            ),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<LoansController>(LoansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return new loan', async () => {
      const createLoanDto: CreateLoanDto = {
        userId: mockUser.id,
        bookId: mockBook.id,
      };

      await expect(controller.create(createLoanDto)).resolves.toEqual(mockLoan);
    });
  });

  describe('findAll', () => {
    it('should return list of all loans', async () => {
      await expect(controller.findAll()).resolves.toEqual([mockLoan]);
    });
  });

  describe('findAll', () => {
    it('should return list of all loans for current user', async () => {
      const mockRequest = {
        user: mockUser,
      };

      await expect(
        controller.findAllForCurrentUser(mockRequest),
      ).resolves.toEqual([mockLoan]);
    });
  });

  describe('findOne', () => {
    it('should return one loan', async () => {
      await expect(controller.findOne(mockLoan.id)).resolves.toEqual(mockLoan);
    });
  });

  describe('update', () => {
    it('should update and return updated loan', async () => {
      const updateLoanDto: UpdateLoanDto = {
        userId: 'different-uuid',
      };

      await expect(
        controller.update(mockLoan.id, updateLoanDto),
      ).resolves.toEqual({
        ...mockLoan,
        ...updateLoanDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove one loan', async () => {
      await expect(controller.remove(mockLoan.id)).resolves.toBeTruthy();
    });
  });
});
