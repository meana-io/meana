import { Test, TestingModule } from '@nestjs/testing';
import { NodeDevicesController } from './node-devices.controller';
import { NodeDevicesService } from './node-devices.service';

describe('NodeDevicesController', () => {
  let controller: NodeDevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeDevicesController],
      providers: [NodeDevicesService],
    }).compile();

    controller = module.get<NodeDevicesController>(NodeDevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
