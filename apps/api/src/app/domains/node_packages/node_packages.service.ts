import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { NodePackageEntity } from '../../../../../../libs/shared/Entities/node-package.entity';
import { CreateNodePackageDto } from './dto/create-node_package.dto';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';
import { NodePackage } from '../../../../../../libs/shared/Types/NodePackage';
import { NodePackageExtended } from '../../../../../../libs/shared/Types/NodePackageExtended';

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

  async setLatest(nodeUuid: string, packages: NodePackageExtended[]) {
    this.activeDevicesModel.removeAttribute('id');

    let activeDevices = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid,
      },
    });

    const stringifyPackages = JSON.stringify(packages);

    if (activeDevices) {
      await activeDevices.update({ packages: stringifyPackages });
      await activeDevices.save();
    } else {
      activeDevices = await this.activeDevicesModel.create({
        nodeUuid: nodeUuid,
        packages: stringifyPackages,
      });
    }

    return activeDevices;
  }

  async getLatest(nodeUuid: string) {
    this.activeDevicesModel.removeAttribute('id');

    const activeDevices = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid,
      },
    });

    if (activeDevices) {
      return activeDevices.packages;
    } else {
      return null;
    }
  }
}
