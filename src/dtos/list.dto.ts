import { SortBy } from '../interfaces/sorting.interface';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListDto {
  @IsOptional()
  searchString?: string;

  @IsOptional()
  sortBy?: SortBy;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  perPage?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;
}
