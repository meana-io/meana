import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { NodePackageEntity } from '../../../../../../libs/shared/Entities/node-package.entity';
import { CreateNodePackageDto } from './dto/create-node_package.dto';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';

@Injectable()
export class NodePackagesService {
  constructor(
    @InjectModel(NodePackageEntity)
    private nodePackageModel: typeof NodePackageEntity,
    @InjectModel(ActiveDevicesEntity)
    private activeDevicesModel: typeof ActiveDevicesEntity
  ) {}

  async create(createNodePackageDto: CreateNodePackageDto) {
    return await this.nodePackageModel.create({ ...createNodePackageDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodePackageModel.findAll(findOptions);
  }

  async getLatest(nodeUuid: string) {
    this.activeDevicesModel.removeAttribute('id');

    const activeDevices = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid,
      },
    });

    if (activeDevices) {
      return activeDevices.disks;
    } else {
      return null;
    }
  }
}
