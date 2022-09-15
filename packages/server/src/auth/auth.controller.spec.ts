import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAccessTokenResponse = {
    access_token: 'this_is_fake_token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(() => Promise.resolve(mockAccessTokenResponse)),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should create access token for user', async () => {
      expect(
        await controller.loginUser({
          user: { username: 'test', id: 'made-up-uuid' },
        }),
      ).toEqual(mockAccessTokenResponse);
    });
  });
});
