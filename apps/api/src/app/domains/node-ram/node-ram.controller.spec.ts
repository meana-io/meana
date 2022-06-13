import { Test, TestingModule } from '@nestjs/testing';
import { NodeRamController } from './node-ram.controller';
import { NodeRamService } from './node-ram.service';

describe('NodeRamController', () => {
  let controller: NodeRamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeRamController],
      providers: [NodeRamService],
    }).compile();

    controller = module.get<NodeRamController>(NodeRamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
