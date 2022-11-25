import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { createMockUser, mockForgottenPassword } from './mocks';
import { mockLoan } from 'src/loans/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockRepo from 'src/utils/mockRepo';
import { ForgottenPassword } from './entities/forgottenPassword.entity';
import { mailSubjects, mailTemplates, resetPasswordFePath } from './constants';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token'),
  verify: jest.fn().mockReturnValue({
    userId: 'mock-user-id',
  }),
}));

describe('UserService', () => {
  let service: UserService;
  let userRepo: Repository<User>;

  const mockOrigin = 'mock-origin';
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
  const mockedForgottenPasswordRepository = mockRepo(
    [mockForgottenPassword],
    mockForgottenPassword,
  );
  const mockedMailerService = {
    sendMail: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedUserRepository,
        },
        {
          provide: getRepositoryToken(ForgottenPassword),
          useValue: mockedForgottenPasswordRepository,
        },
        {
          provide: MailerService,
          useValue: mockedMailerService,
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

  describe('forgottenPassword', () => {
    it('should send email with info, that a user is trying to reset password, but the email is not in our database', async () => {
      mockedUserRepository.findOneBy.mockResolvedValueOnce(null);
      await service.forgottenPassword(mockUser.email, mockOrigin);

      expect(mockedMailerService.sendMail).toHaveBeenCalledWith({
        to: mockUser.email,
        subject: mailSubjects.forgottenPassword,
        template: mailTemplates.forgottenPasswordEmailNotInDb,
        context: {
          email: mockUser.email,
        },
      });
    });

    it('should generate forgotten password token and save it to database', async () => {
      await service.forgottenPassword(mockUser.email, mockOrigin);

      expect(mockedForgottenPasswordRepository.save).toHaveBeenCalledWith({
        token: mockForgottenPassword.token,
      });
    });

    it('should send email with reset password token to user', async () => {
      const mockLink = `${mockOrigin}/${resetPasswordFePath}/${mockForgottenPassword.id}`;
      await service.forgottenPassword(mockUser.email, mockOrigin);

      expect(mockedMailerService.sendMail).toHaveBeenCalledWith({
        to: mockUser.email,
        subject: mailSubjects.forgottenPassword,
        template: mailTemplates.forgottenPassword,
        context: {
          email: mockUser.email,
          link: mockLink,
        },
      });
    });
  });

  describe('resetPassword', () => {
    it('should reset user password', async () => {
      const spy = jest.spyOn(userRepo, 'save');
      await service.resetPassword({
        id: 'mock-id',
        password: 'mock-password',
      });

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
