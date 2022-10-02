import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ListDto } from './dtos/List.dto';
import { MockDataInterface } from './interfaces/mockData.interface';
import { strictSearchRegex } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Query() listDto: ListDto): MockDataInterface[] {
    if (listDto.searchString.match(strictSearchRegex)) {
      console.log('this is working');
      return this.appService.strictSearch(listDto);
    }

    return listDto.searchString
      ? this.appService.fuzzySearch(listDto)
      : this.appService.findAll();
  }
}
