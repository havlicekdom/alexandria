import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsArray()
  genreIds: string[];

  @ApiProperty()
  @IsArray()
  bookIds: string[];
}
