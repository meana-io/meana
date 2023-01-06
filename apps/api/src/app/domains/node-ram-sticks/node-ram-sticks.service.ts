import { Get, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { NodeRamStickEntity } from '../../../../../../libs/shared/Entities/node-ram-stick.entity';
import { CreateNodeRamStickDto } from './dto/create-node-ram-stick.dto';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';

@Injectable()
export class NodeRamSticksService {
  constructor(
    @InjectModel(NodeRamStickEntity)
    private nodeRamStickModel: typeof NodeRamStickEntity,
    @InjectModel(ActiveDevicesEntity)
    private activeDevicesModel: typeof ActiveDevicesEntity
  ) {}

  async create(createNodeRamStickDto: CreateNodeRamStickDto) {
    return await this.nodeRamStickModel.create({ ...createNodeRamStickDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeRamStickModel.findAll(findOptions);
  }

  async getLatest(nodeUuid: string) {
    this.activeDevicesModel.removeAttribute('id');

    const activeDevices = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid,
      },
    });

    if (activeDevices) {
      return activeDevices.ramSticks;
    } else {
      return null;
    }
  }
}
