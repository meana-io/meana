import { Test, TestingModule } from '@nestjs/testing';
import { NodeDisksService } from './node-disks.service';

describe('NodeDisksService', () => {
  let service: NodeDisksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeDisksService],
    }).compile();

    service = module.get<NodeDisksService>(NodeDisksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
