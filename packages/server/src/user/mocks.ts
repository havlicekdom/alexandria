import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';

export const createMockUser = (mockLoan, role: Role = Role.User): User => ({
  id: uuid(),
  username: 'Testuser',
  email: 'testuser@test.com',
  password: 'testpass',
  salt: 'testsalt',
  loans: [mockLoan],
  role,
});

export const mockUser: User = {
  id: uuid(),
  username: 'Testuser',
  email: 'testuser@test.com',
  password: 'testpass',
  salt: 'testsalt',
  loans: [],
  role: Role.User,
};
