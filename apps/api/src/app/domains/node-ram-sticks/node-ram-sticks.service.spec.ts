import { Test, TestingModule } from '@nestjs/testing';
import { NodeRamSticksService } from './node-ram-sticks.service';

describe('NodeRamSticksService', () => {
  let service: NodeRamSticksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeRamSticksService],
    }).compile();

    service = module.get<NodeRamSticksService>(NodeRamSticksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
