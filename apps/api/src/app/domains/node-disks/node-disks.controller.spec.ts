import { Test, TestingModule } from '@nestjs/testing';
import { NodeDisksController } from './node-disks.controller';
import { NodeDisksService } from './node-disks.service';

describe('NodeDisksController', () => {
  let controller: NodeDisksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeDisksController],
      providers: [NodeDisksService],
    }).compile();

    controller = module.get<NodeDisksController>(NodeDisksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
