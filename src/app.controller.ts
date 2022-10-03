import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ListDto } from './dtos/list.dto';
import { MockDataInterface } from './interfaces/mockData.interface';
import { PaginationService } from './pagination/pagination.service';
import { PaginationInterface } from './interfaces/pagination.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get()
  index(@Query() listDto: ListDto): PaginationInterface<MockDataInterface> {
    let searchResults = this.appService.search(listDto);

    if (listDto.sortBy) {
      searchResults = this.appService.sort(listDto, searchResults);
    }

    return this.paginationService.paginate(
      searchResults,
      listDto.perPage,
      listDto.page,
    );
  }
}
