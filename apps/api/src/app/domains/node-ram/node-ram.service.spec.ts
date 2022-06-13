import { Test, TestingModule } from '@nestjs/testing';
import { NodeRamService } from './node-ram.service';

describe('NodeRamService', () => {
  let service: NodeRamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeRamService],
    }).compile();

    service = module.get<NodeRamService>(NodeRamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
