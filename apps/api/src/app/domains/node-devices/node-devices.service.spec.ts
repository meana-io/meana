import { Test, TestingModule } from '@nestjs/testing';
import { NodeDevicesService } from './node-devices.service';

describe('NodeDevicesService', () => {
  let service: NodeDevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeDevicesService],
    }).compile();

    service = module.get<NodeDevicesService>(NodeDevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
