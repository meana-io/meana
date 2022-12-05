import { Test, TestingModule } from '@nestjs/testing';
import { NodeThresholdsService } from './node-thresholds.service';

describe('NodeThresholdsService', () => {
  let service: NodeThresholdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeThresholdsService],
    }).compile();

    service = module.get<NodeThresholdsService>(NodeThresholdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
