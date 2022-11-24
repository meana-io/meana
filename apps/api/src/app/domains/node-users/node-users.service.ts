import { Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { NodeUserEntity } from '../../../../../../libs/shared/Entities/node-user.entity';
import { CreateNodeUserDto } from './dto/create-node-user.dto';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';

@Injectable()
export class NodeUsersService {
  constructor(
    @InjectModel(NodeUserEntity) private nodeUserModel: typeof NodeUserEntity,
    @InjectModel(ActiveDevicesEntity)
    private activeDevicesModel: typeof ActiveDevicesEntity
  ) {}

  async create(createNodeUserDto: CreateNodeUserDto) {
    return await this.nodeUserModel.create({ ...createNodeUserDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeUserModel.findAll(findOptions);
  }

  async getLatest(nodeUuid: string) {
    this.activeDevicesModel.removeAttribute('id');

    const activeDevices = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid,
      },
    });

    if (activeDevices) {
      return activeDevices.users;
    } else {
      return null;
    }
  }
}
