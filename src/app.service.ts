import { Injectable } from '@nestjs/common';
import { ListDto } from './dtos/List.dto';
import { MockDataInterface } from './interfaces/mockData.interface';
import { MockDataRepoService } from './mock-data-repo/mock-data-repo.service';

@Injectable()
export class AppService {
  constructor(private readonly mockDataRepo: MockDataRepoService) {}

  public findAll(): MockDataInterface[] {
    return this.mockDataRepo.findAll();
  }

  public list(listDto: ListDto): MockDataInterface[] {
    return this.findAll().filter((element: MockDataInterface) => {
      return (
        element.name.includes(listDto.searchString) ||
        element.description.includes(listDto.searchString)
      );
    });
  }
}
