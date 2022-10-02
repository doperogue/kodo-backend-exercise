import { Injectable } from '@nestjs/common';
import { ListDto } from './dtos/List.dto';
import { MockDataInterface } from './interfaces/mockData.interface';
import { MockDataRepoService } from './mock-data-repo/mock-data-repo.service';

@Injectable()
export class AppService {
  constructor(private readonly mockDataRepo: MockDataRepoService) {}

  private searchableTags = ['name', 'description'];

  public findAll(): MockDataInterface[] {
    return this.mockDataRepo.findAll();
  }

  public fuzzySearch(listDto: ListDto): MockDataInterface[] {
    const searchTerms = listDto.searchString.split(' ');

    return this.findAll().filter((element: MockDataInterface) => {
      for (const searchTerm of searchTerms) {
        for (const tag of this.searchableTags) {
          // Case-insensitive search
          if (element[tag].search(`/${searchTerm}/i`)) {
            return true;
          }
        }
      }

      return false;
    });
  }

  public strictSearch(listDto: ListDto): MockDataInterface[] {
    // Remove " from search string
    const searchTerm = listDto.searchString.replace(/"/g, '');

    return this.findAll().filter((element: MockDataInterface) => {
      for (const tag of this.searchableTags) {
        // Case-sensitive search
        if (element[tag].includes(searchTerm)) {
          return true;
        }
      }

      return false;
    });
  }
}
