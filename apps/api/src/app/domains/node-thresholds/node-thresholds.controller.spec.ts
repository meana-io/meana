import { Test, TestingModule } from '@nestjs/testing';
import { NodeThresholdsController } from './node-thresholds.controller';
import { NodeThresholdsService } from './node-thresholds.service';

describe('NodeThresholdsController', () => {
  let controller: NodeThresholdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeThresholdsController],
      providers: [NodeThresholdsService],
    }).compile();

    controller = module.get<NodeThresholdsController>(NodeThresholdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
