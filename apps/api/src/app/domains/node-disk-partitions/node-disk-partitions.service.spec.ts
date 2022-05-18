import { Test, TestingModule } from '@nestjs/testing';
import { NodeDiskPartitionsService } from './node-disk-partitions.service';

describe('NodeDiskPartitionsService', () => {
  let service: NodeDiskPartitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeDiskPartitionsService],
    }).compile();

    service = module.get<NodeDiskPartitionsService>(NodeDiskPartitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
