import { Injectable } from '@nestjs/common';
import { PaginationInterface } from '../interfaces/pagination.interface';
import { MockDataInterface } from '../interfaces/mockData.interface';

@Injectable()
export class PaginationService {
  public paginate(
    list,
    perPage = 5,
    page = 1,
  ): PaginationInterface<MockDataInterface> {
    const start: number = perPage * (page - 1);
    const end: number = start + perPage;

    return {
      items: list.slice(start, end),
      total: list.length,
      page: page,
      perPage: perPage,
    } as PaginationInterface<MockDataInterface>;
  }
}
