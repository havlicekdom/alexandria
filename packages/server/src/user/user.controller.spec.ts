import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { createMockUser } from './mocks';
import { mockLoan } from 'src/loans/mocks';
import { UserService } from './user.service';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = createMockUser(mockLoan);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            validatePassword: jest.fn((valid = true) => valid),
            findOne: jest.fn().mockResolvedValue(mockUser),
            findOneByUsername: jest.fn().mockResolvedValue(mockUser),
            findOneByEmail: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn((id, updateUserDto) =>
              Promise.resolve({
                ...mockUser,
                ...updateUserDto,
              }),
            ),
            changePassword: jest.fn((id, oldPassword, newPassword) =>
              Promise.resolve({ ...mockUser, password: newPassword }),
            ),
            resetPassword: jest.fn(),
            getPublicUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrentUser', () => {
    it('should return currently logged in user provided in request object', async () => {
      const user = {
        username: mockUser.username,
        id: mockUser.id,
      };

      expect(await controller.getCurrentUser({ user })).toEqual(user);
    });
  });

  describe('getUser', () => {
    it('should return user based on provided id', async () => {
      expect(await controller.getUser(mockUser.id)).toEqual(mockUser);
    });
  });

  describe('changePassword', () => {
    it('should change the password of current user', async () => {
      const changePasswordDto: ChangeUserPasswordDto = {
        oldPassword: 'test-old-pass',
        newPassword: 'test-new-password',
        confirmNewPassword: 'test-new-password',
      };

      expect(
        await controller.changePassword({ user: mockUser }, changePasswordDto),
      ).toEqual({
        ...mockUser,
        password: changePasswordDto.newPassword,
      });
    });
  });

  describe('updateUser', () => {
    it('should update user info', async () => {
      const updateUserDto = {
        username: 'Test new name',
      };

      expect(await controller.updateUser(mockUser.id, updateUserDto)).toEqual({
        ...mockUser,
        ...updateUserDto,
      });
    });
  });

  describe('registerUser', () => {
    it('should create new user', async () => {
      const createUserDto = {
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
        confirmPassword: mockUser.password,
      };

      expect(await controller.registerUser(createUserDto)).toEqual(mockUser);
    });
  });

  describe('resetPassword', () => {
    it('should create new password for user', async () => {
      const resetUserPasswordDto: ResetUserPasswordDto = {
        email: mockUser.email,
      };
      await controller.resetPassword(resetUserPasswordDto);

      const spy = jest.spyOn(service, 'resetPassword');

      expect(spy).toHaveBeenCalledWith(mockUser.email);
    });
  });
});
