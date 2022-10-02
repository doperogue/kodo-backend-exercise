import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockDataRepoService } from './mock-data-repo/mock-data-repo.service';

describe('AppController', () => {
  let appController: AppController;

  const data = [
    {
      name: 'The Lion King',
      image: 'http://lorempixel.com/640/480',
      description:
        'The Lion King is a 1994 American animated musical drama film directed by Roger Allers and Rob Minkoff (in their feature directorial debuts), produced by Walt Disney Feature Animation and released by Walt Disney Pictures.',
      dateLastEdited: '2018-09-12T11:28:51.962Z',
    },
    {
      name: 'The Lord of the Rings: The Return of the King',
      image: 'http://lorempixel.com/640/480',
      description:
        "The Lord of the Rings: The Return of the King is a 2003 epic fantasy adventure film directed by Peter Jackson from a screenplay by Fran Walsh, Philippa Boyens, and Jackson, based on 1955's The Return of the King, the third volume of the novel The Lord of the Rings by J. R. R. Tolkien.",
      dateLastEdited: '2018-03-03T20:20:14.943Z',
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        MockDataRepoService,
        {
          provide: 'MockDataRepository',
          useValue: data,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('search', () => {
    it('fuzzy search', () => {
      const fuzzyResult = [
        {
          name: 'The Lion King',
          image: 'http://lorempixel.com/640/480',
          description:
            'The Lion King is a 1994 American animated musical drama film directed by Roger Allers and Rob Minkoff (in their feature directorial debuts), produced by Walt Disney Feature Animation and released by Walt Disney Pictures.',
          dateLastEdited: '2018-09-12T11:28:51.962Z',
        },
        {
          name: 'The Lord of the Rings: The Return of the King',
          image: 'http://lorempixel.com/640/480',
          description:
            "The Lord of the Rings: The Return of the King is a 2003 epic fantasy adventure film directed by Peter Jackson from a screenplay by Fran Walsh, Philippa Boyens, and Jackson, based on 1955's The Return of the King, the third volume of the novel The Lord of the Rings by J. R. R. Tolkien.",
          dateLastEdited: '2018-03-03T20:20:14.943Z',
        },
      ];

      expect(appController.index({ searchString: 'the king' })).toStrictEqual(
        fuzzyResult,
      );
    });

    it('strict search', () => {
      const strictResult = [
        {
          name: 'The Lord of the Rings: The Return of the King',
          image: 'http://lorempixel.com/640/480',
          description:
            "The Lord of the Rings: The Return of the King is a 2003 epic fantasy adventure film directed by Peter Jackson from a screenplay by Fran Walsh, Philippa Boyens, and Jackson, based on 1955's The Return of the King, the third volume of the novel The Lord of the Rings by J. R. R. Tolkien.",
          dateLastEdited: '2018-03-03T20:20:14.943Z',
        },
      ];

      expect(appController.index({ searchString: 'Return' })).toStrictEqual(
        strictResult,
      );
    });
  });
});
