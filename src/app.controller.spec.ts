import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = new AppService();
  });

  describe('search', () => {
    it('fuzzy search', () => {
      //todo: Improve this test after implementing Model Injection
      expect(appController.index({ searchString: 'Dynamic' })).toBe(
        appService.list({ searchString: 'Dynamic' }),
      );
    });
  });
});
