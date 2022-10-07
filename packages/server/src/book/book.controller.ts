import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/metadata/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
@ApiTags('book')
@ApiBearerAuth()
@Roles([Role.Admin])
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @Roles([Role.Admin, Role.User])
  findAll() {
    return this.bookService.findAll();
  }

  @Get('/loanable')
  @Roles([Role.Admin, Role.User])
  findLoanable() {
    return this.bookService.findLoanable();
  }

  @Get('/latest')
  @Roles([Role.Admin, Role.User])
  findLatest() {
    return this.bookService.findLatest();
  }

  @Get(':id')
  @Roles([Role.Admin, Role.User])
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
