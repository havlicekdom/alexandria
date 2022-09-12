import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BookFormat } from '../entities/book.entity';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(BookFormat)
  format: BookFormat;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  releaseYear: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  genreIds: string[];
}
