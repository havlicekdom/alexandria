import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { createMockUser } from './mocks';
import { mockLoan } from 'src/loans/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockRepo from 'src/utils/mockRepo';

describe('UserService', () => {
  let service: UserService;
  let userRepo: Repository<User>;

  const mockUser = createMockUser(mockLoan);
  const mockedUserRepository = Object.assign(
    {},
    mockRepo([mockUser], mockUser),
    {
      createQueryBuilder: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(null),
    },
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an user based on provided id', async () => {
      expect(await service.findOne(mockUser.id)).toEqual(mockUser);
    });
  });

  describe('findOneByUsername', () => {
    it('should return an user based on provided username', async () => {
      expect(await service.findOneByUsername(mockUser.username)).toEqual(
        mockUser,
      );
    });
  });

  describe('findOneByEmail', () => {
    it('should return an user based on provided email', async () => {
      expect(await service.findOneByEmail(mockUser.email)).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should create an user', async () => {
      const createUserDto = {
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
        confirmPassword: mockUser.password,
      };
      const spy = jest.spyOn(userRepo, 'save');
      await service.create(createUserDto);

      // TODO: Add bcrypt mocks and check for returned user object instead
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an user based on id', async () => {
      const updateUserDto = {
        username: 'test new username',
      };
      const spy = jest.spyOn(userRepo, 'save');
      await service.update(mockUser.id, updateUserDto);

      expect(spy).toHaveBeenCalledWith({
        ...mockUser,
        ...updateUserDto,
      });
    });
  });

  // TODO: Mock bcrypt compareSync method to fix this unit test
  // describe('changePassword', () => {
  //   it('should change user password', async () => {
  //     const spy = jest.spyOn(userRepo, 'save');
  //     await service.changePassword(
  //       mockUser.id,
  //       mockUser.password,
  //       'testnewpassword',
  //     );
  //     // TODO: Add bcrypt mocks and check for returned user object instead
  //     expect(spy).toHaveBeenCalled();
  //   });
  // });

  describe('resetPassword', () => {
    it('should reset user password', async () => {
      const spy = jest.spyOn(userRepo, 'save');
      await service.resetPassword(mockUser.email);

      // TODO: Add bcrypt mocks and check for returned user object instead
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getPublicUser', () => {
    it('should return user without sensitive data', async () => {
      const { password, salt, ...expectedUser } = mockUser;

      expect(await service.getPublicUser(mockUser.id)).toEqual(expectedUser);
    });
  });
});
