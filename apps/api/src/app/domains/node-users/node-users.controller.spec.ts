import { Test, TestingModule } from '@nestjs/testing';
import { NodeUsersController } from './node-users.controller';
import { NodeUsersService } from './node-users.service';

describe('NodeUsersController', () => {
  let controller: NodeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodeUsersController],
      providers: [NodeUsersService],
    }).compile();

    controller = module.get<NodeUsersController>(NodeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
