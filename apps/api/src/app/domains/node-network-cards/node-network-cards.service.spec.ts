import { Test, TestingModule } from '@nestjs/testing';
import { NodeNetworkCardsService } from './node-network-cards.service';

describe('NodeNetworkCardsService', () => {
  let service: NodeNetworkCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeNetworkCardsService],
    }).compile();

    service = module.get<NodeNetworkCardsService>(NodeNetworkCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
