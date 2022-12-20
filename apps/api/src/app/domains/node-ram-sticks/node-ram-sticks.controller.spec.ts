import { Test, TestingModule } from '@nestjs/testing';
import { NodeRamSticksController } from './node-ram-sticks.controller';
import { NodeRamSticksService } from './node-ram-sticks.service';

describe('NodeRamSticksController', () => {
  let controller: NodeRamSticksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeRamSticksController],
      providers: [NodeRamSticksService],
    }).compile();

    controller = module.get<NodeRamSticksController>(NodeRamSticksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
