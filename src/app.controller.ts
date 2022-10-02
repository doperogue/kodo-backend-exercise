import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ListDto } from './dtos/List.dto';
import { MockDataInterface } from './interfaces/mockData.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Query() listDto: ListDto): MockDataInterface[] {
    return listDto.searchString
      ? this.appService.list(listDto)
      : this.appService.findAll();
  }
}
