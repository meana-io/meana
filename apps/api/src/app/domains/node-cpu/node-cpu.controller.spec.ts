import { Test, TestingModule } from '@nestjs/testing';
import { NodeCpuController } from './node-cpu.controller';
import { NodeCpuService } from './node-cpu.service';

describe('NodeCpuController', () => {
  let controller: NodeCpuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeCpuController],
      providers: [NodeCpuService],
    }).compile();

    controller = module.get<NodeCpuController>(NodeCpuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
