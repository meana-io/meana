import { Test, TestingModule } from '@nestjs/testing';
import { NodeCpuService } from './node-cpu.service';

describe('NodeCpuService', () => {
  let service: NodeCpuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeCpuService],
    }).compile();

    service = module.get<NodeCpuService>(NodeCpuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
