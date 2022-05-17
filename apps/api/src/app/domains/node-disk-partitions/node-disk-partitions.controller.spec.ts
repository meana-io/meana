import { Test, TestingModule } from '@nestjs/testing';
import { NodeDiskPartitionsController } from './node-disk-partitions.controller';
import { NodeDiskPartitionsService } from './node-disk-partitions.service';

describe('NodeDiskPartitionsController', () => {
  let controller: NodeDiskPartitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeDiskPartitionsController],
      providers: [NodeDiskPartitionsService],
    }).compile();

    controller = module.get<NodeDiskPartitionsController>(
      NodeDiskPartitionsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
