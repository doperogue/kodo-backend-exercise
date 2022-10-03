import { Injectable } from '@nestjs/common';
import { ListDto } from './dtos/list.dto';
import { MockDataInterface } from './interfaces/mockData.interface';
import { MockDataRepoService } from './mock-data-repo/mock-data-repo.service';
import { strictSearchRegex } from './constants';

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
          if (this.caseInsensitiveSearch(searchTerm, element[tag])) {
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
        // Case-insensitive search
        if (this.caseInsensitiveSearch(searchTerm, element[tag])) {
          return true;
        }
      }

      return false;
    });
  }

  protected caseInsensitiveSearch(needle: string, haystack: string) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
  }

  public sort(listDto: ListDto, list: MockDataInterface[]) {
    return list.sort((prev, next) => {
      const left = prev[listDto.sortBy];
      const right = next[listDto.sortBy];

      // Not the best implementation but this will work.
      return left > right ? 1 : right > left ? -1 : 0;
    });
  }

  public search(listDto: ListDto) {
    if (listDto.searchString) {
      if (listDto.searchString.match(strictSearchRegex))
        return this.strictSearch(listDto);
    }

    return listDto.searchString ? this.fuzzySearch(listDto) : this.findAll();
  }
}
