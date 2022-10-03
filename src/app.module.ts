import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockDataRepoService } from './mock-data-repo/mock-data-repo.service';
import { PaginationService } from './pagination/pagination.service';

const mockDataRepoProvider = {
  provide: 'MockDataRepository',
  useValue: null,
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MockDataRepoService, mockDataRepoProvider, PaginationService],
})
export class AppModule {}
