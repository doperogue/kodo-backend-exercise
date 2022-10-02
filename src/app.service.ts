import { Injectable } from '@nestjs/common';
import { ListDto } from './dtos/List.dto';
import { MockData } from './data.store';
import { MockDataInterface } from './interfaces/mockData.interface';

@Injectable()
export class AppService {
  public findAll(): MockDataInterface[] {
    return MockData;
  }

  public list(listDto: ListDto): MockDataInterface[] {
    return MockData.filter((element: MockDataInterface) => {
      return (
        element.name.includes(listDto.searchString) ||
        element.description.includes(listDto.searchString)
      );
    });
  }
}
