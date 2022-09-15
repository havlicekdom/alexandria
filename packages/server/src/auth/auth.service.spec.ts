import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { mockUser } from 'src/user/mocks';

describe('AuthService', () => {
  let service: AuthService;

  const mockToken = 'mock-jwt-token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByUsername: jest.fn().mockResolvedValue(mockUser),
            validatePassword: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(mockToken),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate user via username and password and return the user', async () => {
      const expectedUser = Object.assign({}, mockUser);
      delete expectedUser.password;
      delete expectedUser.salt;

      expect(
        await service.validateUser(mockUser.username, mockUser.password),
      ).toEqual(expectedUser);
    });
  });

  describe('login', () => {
    it('should login user and return object with jwt token', () => {
      expect(service.login(mockUser)).toEqual({ access_token: mockToken });
    });
  });
});
