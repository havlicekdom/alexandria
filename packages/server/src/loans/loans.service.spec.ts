import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { mockBook } from 'src/book/mocks';
import { User } from 'src/user/entities/user.entity';
import { mockUser } from 'src/user/mocks';
import mockRepo from 'src/utils/mockRepo';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { LoansService } from './loans.service';
import { createMockLoan } from './mocks';

describe('LoansService', () => {
  let service: LoansService;
  let loanRepo: Repository<Loan>;

  const mockLoan = createMockLoan(mockUser, mockBook);
  const mockedLoanRepository = mockRepo([mockLoan], mockLoan);
  const mockedBookRepository = mockRepo([mockBook], mockBook);
  const mockedUserRepository = mockRepo([mockUser], mockUser);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        {
          provide: getRepositoryToken(Loan),
          useValue: mockedLoanRepository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockedBookRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockedUserRepository,
        },
      ],
    }).compile();

    service = module.get<LoansService>(LoansService);
    loanRepo = module.get<Repository<Loan>>(getRepositoryToken(Loan));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new loan', async () => {
      const newLoan = {
        userId: mockUser.id,
        bookId: mockBook.id,
      };
      await service.create(newLoan);
      const saveSpy = jest.spyOn(loanRepo, 'save');
      expect(saveSpy).toHaveBeenCalledWith(newLoan);
    });
  });

  describe('findAll', () => {
    it('should return all loans', async () => {
      const loans = await service.findAll();

      expect(loanRepo.find).toHaveBeenCalled();
      expect(loans).toEqual([mockLoan]);
    });
  });

  describe('findAllByUserId', () => {
    it('should return all loans for user with specified ID', async () => {
      const loans = await service.findAllByUserId(mockUser.id);

      expect(loanRepo.find).toHaveBeenCalled();
      expect(loans).toEqual([mockLoan]);
    });
  });

  describe('findOne', () => {
    it('should return loan with provided ID', async () => {
      const loan = await service.findOne(mockLoan.id);

      expect(loanRepo.findOneBy).toHaveBeenCalled();
      expect(loan).toEqual(mockLoan);
    });
  });

  describe('update', () => {
    it('should return updated loan with provided ID', async () => {
      const newUserId = 'new-user-uuid';
      await service.update(mockLoan.id, {
        userId: newUserId,
      });
      const saveSpy = jest.spyOn(loanRepo, 'save');

      expect(saveSpy).toHaveBeenCalledWith({
        ...mockLoan,
        userId: newUserId,
      });
    });
  });

  describe('remove', () => {
    it('should delete loan with provided ID', async () => {
      await service.remove(mockLoan.id);

      expect(loanRepo.delete).toHaveBeenCalledWith({ id: mockLoan.id });
    });
  });
});
