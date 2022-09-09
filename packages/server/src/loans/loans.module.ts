import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { Loan } from './entities/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Loan, Book])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
