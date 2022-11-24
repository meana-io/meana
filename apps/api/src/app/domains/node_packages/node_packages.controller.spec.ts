import { Test, TestingModule } from '@nestjs/testing';
import { NodePackagesController } from './node_packages.controller';
import { NodePackagesService } from './node_packages.service';

describe('NodePackagesController', () => {
  let controller: NodePackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodePackagesController],
      providers: [NodePackagesService],
    }).compile();

    controller = module.get<NodePackagesController>(NodePackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
