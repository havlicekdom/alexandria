import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';
import { createLoanEndDate } from 'src/loans/utils/loans';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  private async getUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  private async getBookById(id: string) {
    return await this.bookRepository.findOneBy({ id });
  }

  async create(createLoanDto: CreateLoanDto) {
    const user = await this.getUserById(createLoanDto.userId);
    const book = await this.getBookById(createLoanDto.bookId);
    const dateEnd = createLoanEndDate();
    const toSave = Object.assign(createLoanDto, {
      user,
      book,
      dateEnd,
    });

    return await this.loanRepository.save(toSave);
  }

  async findAll() {
    return await this.loanRepository.find();
  }

  async findOne(id: string) {
    return await this.loanRepository.findOneBy({ id });
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    const user = await this.getUserById(updateLoanDto.userId);
    const book = await this.getBookById(updateLoanDto.bookId);
    const toUpdate = await this.findOne(id);
    const toSave = Object.assign(toUpdate, updateLoanDto, {
      user,
      book,
    });

    return await this.loanRepository.save(toSave);
  }

  async remove(id: string) {
    return await this.loanRepository.delete({ id });
  }
}
