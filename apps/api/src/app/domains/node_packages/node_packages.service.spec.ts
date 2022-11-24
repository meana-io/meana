import { Test, TestingModule } from '@nestjs/testing';
import { NodePackagesService } from './node_packages.service';

describe('NodePackagesService', () => {
  let service: NodePackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodePackagesService],
    }).compile();

    service = module.get<NodePackagesService>(NodePackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
