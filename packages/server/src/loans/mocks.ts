import { v4 as uuid } from 'uuid';
import { Loan } from './entities/loan.entity';

export const createMockLoan = (mockUser, mockBook) => ({
  id: uuid(),
  user: mockUser,
  book: mockBook,
  dateBegin: new Date(),
  dateEnd: new Date(),
});

export const mockLoan: Loan = {
  id: uuid(),
  user: null,
  book: null,
  dateBegin: new Date(),
  dateEnd: new Date(),
};
