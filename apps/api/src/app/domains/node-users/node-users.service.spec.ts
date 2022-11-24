import { Test, TestingModule } from '@nestjs/testing';
import { NodeUsersService } from './node-users.service';

describe('NodeUsersService', () => {
  let service: NodeUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeUsersService],
    }).compile();

    service = module.get<NodeUsersService>(NodeUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
