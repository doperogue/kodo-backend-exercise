import { Inject, Injectable } from '@nestjs/common';
import { MockDataInterface } from '../interfaces/mockData.interface';
import { MockData } from '../data.store';

@Injectable()
export class MockDataRepoService {
  private store: MockDataInterface[];

  constructor(@Inject('MockDataRepository') data?: MockDataInterface[]) {
    this.store = !!data ? data : MockData;
  }

  public findAll() {
    return this.store;
  }
}
