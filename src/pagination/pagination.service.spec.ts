import { Test, TestingModule } from '@nestjs/testing';
import { PaginationService } from './pagination.service';
import { PaginationInterface } from '../interfaces/pagination.interface';
import { MockDataInterface } from '../interfaces/mockData.interface';

describe('PaginationService', () => {
  let service: PaginationService;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();

    service = module.get<PaginationService>(PaginationService);
  });

  it('pagination', () => {
    const paginationResult: PaginationInterface<MockDataInterface> = {
      items: [
        {
          name: 'The Lion King',
          image: 'http://lorempixel.com/640/480',
          description:
            'The Lion King is a 1994 American animated musical drama film directed by Roger Allers and Rob Minkoff (in their feature directorial debuts), produced by Walt Disney Feature Animation and released by Walt Disney Pictures.',
          dateLastEdited: '2018-09-12T11:28:51.962Z',
        },
      ],
      page: 1,
      perPage: 1,
      total: 2,
    };

    expect(service.paginate(data, 1, 1)).toStrictEqual(paginationResult);
  });
});
