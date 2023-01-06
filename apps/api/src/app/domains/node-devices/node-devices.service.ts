import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { NodeDeviceEntity } from '../../../../../../libs/shared/Entities/node-device.entity';
import { CreateNodeDeviceDto } from './dto/create-node-device.dto';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';

@Injectable()
export class NodeDevicesService {
  constructor(
    @InjectModel(NodeDeviceEntity)
    private nodeDeviceModel: typeof NodeDeviceEntity,
    @InjectModel(ActiveDevicesEntity)
    private activeDevicesModel: typeof ActiveDevicesEntity
  ) {}
  async create(createNodeRamDto: CreateNodeDeviceDto) {
    return await this.nodeDeviceModel.create({ ...createNodeRamDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeDeviceModel.findAll(findOptions);
  }

  async getLatest(nodeUuid: string) {
    this.activeDevicesModel.removeAttribute('id');

    const activeDevices = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid,
      },
    });

    if (activeDevices) {
      return activeDevices.devices;
    } else {
      return null;
    }
  }
}
