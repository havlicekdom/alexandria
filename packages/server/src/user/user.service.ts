import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { User } from './entities/user.entity';
import { ForgottenPassword } from './entities/forgottenPassword.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ForgottenPasswordJwtToken, PublicUser } from './user.interface';
import { mailSubjects, mailTemplates, resetPasswordFePath } from './constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ForgottenPassword)
    private forgottenPasswordRepository: Repository<ForgottenPassword>,
    private mailerService: MailerService,
  ) {}

  private async generateForgottenPasswordRecord(userId: string) {
    const jwtToken = jwt.sign(
      {
        user: userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '5m',
      },
    );

    const record = await this.forgottenPasswordRepository.save({
      token: jwtToken,
    });

    return record.id;
  }

  private async validateForgottenPasswordToken(id: string) {
    const record = await this.forgottenPasswordRepository.findOneBy({ id });

    if (!record) {
      throw new HttpException(
        { message: 'Requested token not found.' },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const token = jwt.verify(
        record.token,
        process.env.JWT_SECRET,
      ) as ForgottenPasswordJwtToken;

      return token.userId;
    } catch (error) {
      this.forgottenPasswordRepository.delete({ id });

      throw new HttpException(
        { message: 'Your request has expired, please create new one.' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private async hashPassword(
    password: string,
  ): Promise<{ salt: string; hashedPassword: string }> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    return {
      salt,
      hashedPassword,
    };
  }

  private async createUser(userDto: CreateUserDto): Promise<any> {
    const { username, email, password } = userDto;
    const { salt, hashedPassword } = await this.hashPassword(password);

    return {
      username,
      email,
      password: hashedPassword,
      salt,
    };
  }

  private removeSensitiveDataFromUser(user: User): PublicUser {
    delete user.password;
    delete user.salt;

    return user;
  }

  validatePassword(user: User, password: string): boolean {
    return compareSync(password, user.password);
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(userDto: CreateUserDto): Promise<void> {
    const { username, email } = userDto;
    const qb = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.createUser(userDto);

    await this.usersRepository.save(newUser);
  }

  async update(id: string, dto: UpdateUserDto): Promise<void> {
    const toUpdate = await this.findOne(id);

    const updated = Object.assign(
      this.removeSensitiveDataFromUser(toUpdate),
      dto,
    ) as User;

    if (dto.password) {
      const { salt, hashedPassword } = await this.hashPassword(dto.password);
      updated.password = hashedPassword;
      updated.salt = salt;
    }

    await this.usersRepository.save(updated);
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const toUpdate = await this.findOne(id);
    const isOldPasswordValid = this.validatePassword(toUpdate, oldPassword);

    if (!isOldPasswordValid) {
      const errors = { oldPassword: 'Your old password is wrong.' };

      throw new BadRequestException({
        message: 'Input data validation failed',
        errors,
      });
    }

    const { salt, hashedPassword } = await this.hashPassword(newPassword);
    const updated = Object.assign(toUpdate, {
      salt,
      password: hashedPassword,
    });

    await this.usersRepository.save(updated);
  }

  async forgottenPassword(email: string, origin: string): Promise<void> {
    const toUpdate = await this.findOneByEmail(email);

    if (!toUpdate && process.env.ENV === 'production') {
      return await this.mailerService.sendMail({
        to: email,
        subject: mailSubjects.forgottenPassword,
        template: mailTemplates.forgottenPasswordEmailNotInDb,
        context: {
          email,
        },
      });
    }

    const id = await this.generateForgottenPasswordRecord(toUpdate.id);
    const link = `${origin}/${resetPasswordFePath}/${id}`;

    if (process.env.ENV === 'production') {
        await this.mailerService.sendMail({
        to: email,
        subject: mailSubjects.forgottenPassword,
        template: mailTemplates.forgottenPassword,
        context: {
          email,
          link,
        },
      });
    }
  }

  async resetPassword({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): Promise<void> {
    const userId = await this.validateForgottenPasswordToken(id);

    const toUpdate = await this.findOne(userId);

    if (!toUpdate) return;

    const { salt, hashedPassword } = await this.hashPassword(password);
    const updated = Object.assign(toUpdate, {
      salt,
      password: hashedPassword,
    });

    await this.usersRepository.save(updated);
    await this.forgottenPasswordRepository.delete({ id });
  }

  async getPublicUser(id: string) {
    return this.removeSensitiveDataFromUser(await this.findOne(id));
  }
}
