import { Test, TestingModule } from '@nestjs/testing';
import { NodeNetworkCardsController } from './node-network-cards.controller';
import { NodeNetworkCardsService } from './node-network-cards.service';

describe('NodeNetworkCardsController', () => {
  let controller: NodeNetworkCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeNetworkCardsController],
      providers: [NodeNetworkCardsService],
    }).compile();

    controller = module.get<NodeNetworkCardsController>(NodeNetworkCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
