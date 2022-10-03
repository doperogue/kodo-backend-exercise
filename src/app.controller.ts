import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ListDto } from './dtos/list.dto';
import { MockDataInterface } from './interfaces/mockData.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Query() listDto: ListDto): MockDataInterface[] {
    let searchResults = this.appService.search(listDto);

    if (listDto.sortBy) {
      searchResults = this.appService.sort(listDto, searchResults);
    }

    return searchResults;
  }
}
