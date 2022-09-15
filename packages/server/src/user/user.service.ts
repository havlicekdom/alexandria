import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { genSalt, hash, compareSync } from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PublicUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
    );
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

  async resetPassword(email: string): Promise<void> {
    const toUpdate = await this.findOneByEmail(email);
    const newPassword = uuid().substring(0, 8);
    const { salt, hashedPassword } = await this.hashPassword(newPassword);
    const updated = Object.assign(toUpdate, {
      salt,
      password: hashedPassword,
    });

    await this.usersRepository.save(updated);
  }

  async getPublicUser(id: string) {
    return this.removeSensitiveDataFromUser(await this.findOne(id));
  }
}
