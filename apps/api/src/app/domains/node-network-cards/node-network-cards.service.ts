import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';
import { CreateNodeRamStickDto } from '../node-ram-sticks/dto/create-node-ram-stick.dto';
import { FindOptions } from 'sequelize';
import { NodeNetworkCardEntity } from '../../../../../../libs/shared/Entities/node-network-card.entity';

@Injectable()
export class NodeNetworkCardsService {
  constructor(
    @InjectModel(NodeNetworkCardEntity)
    private nodeNetworkCardEntity: typeof NodeNetworkCardEntity,
    @InjectModel(ActiveDevicesEntity)
    private activeDevicesModel: typeof ActiveDevicesEntity
  ) {}

  async create(createNodeRamStickDto: CreateNodeRamStickDto) {
    return await this.nodeNetworkCardEntity.create({
      ...createNodeRamStickDto,
    });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeNetworkCardEntity.findAll(findOptions);
  }

  async getLatest(nodeUuid: string) {
    this.activeDevicesModel.removeAttribute('id');

    const activeDevices = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid,
      },
    });

    if (activeDevices) {
      return activeDevices.networkCards;
    } else {
      return null;
    }
  }
}
