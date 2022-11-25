import { HttpException, Injectable } from '@nestjs/common';
import { CreateGlobalDto } from './dto/create-global.dto';
import { InjectModel } from '@nestjs/sequelize';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NodeEntity } from '../../../../../../libs/shared/Entities/node.entity';
import { NodeDiskEntity } from '../../../../../../libs/shared/Entities/node-disk.entity';
import { NodeDiskPartitionEntity } from '../../../../../../libs/shared/Entities/node-disk-partition.entity';
import { NodeRamEntity } from '../../../../../../libs/shared/Entities/node-ram.entity';
import { NodeCpuEntity } from '../../../../../../libs/shared/Entities/node-cpu.entity';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';
import * as fs from 'fs';
import { NodeUserEntity } from '../../../../../../libs/shared/Entities/node-user.entity';
import { NodePackageEntity } from '../../../../../../libs/shared/Entities/node-package.entity';

/* eslint-enable @nrwl/nx/enforce-module-boundaries */

@Injectable()
export class GlobalService {
  constructor(
    @InjectModel(NodeEntity) private nodeModel: typeof NodeEntity,
    @InjectModel(NodeDiskEntity) private nodeDiskModel: typeof NodeDiskEntity,
    @InjectModel(NodeDiskPartitionEntity)
    private nodeDiskPartitionModel: typeof NodeDiskPartitionEntity,
    @InjectModel(NodeRamEntity) private nodeRamModel: typeof NodeRamEntity,
    @InjectModel(NodeCpuEntity) private nodeCpuModel: typeof NodeCpuEntity,
    @InjectModel(ActiveDevicesEntity)
    private activeDevicesModel: typeof ActiveDevicesEntity,
    @InjectModel(NodeUserEntity) private nodeUserModel: typeof NodeUserEntity,
    @InjectModel(NodePackageEntity)
    private nodePackageModel: typeof NodePackageEntity
  ) {}
  async insert(createGlobalDto: CreateGlobalDto) {
    this.saveLog(createGlobalDto);
    this.nodeModel.removeAttribute('id');
    this.activeDevicesModel.removeAttribute('id');
    const node = await this.nodeModel.findOne({
      where: {
        uuid: createGlobalDto.nodeUuid,
      },
    });

    if (node === null) {
      throw new HttpException('Node not found!', 404);
    }

    const activeDevices = {
      disks: createGlobalDto.disks,
      packages: createGlobalDto.packages?.packages,
      users: createGlobalDto.users.users,
    };

    for (const disk of createGlobalDto.disks) {
      const createdDisk = await this.nodeDiskModel.create({
        ...disk,
        nodeId: node.uuid,
      });

      if (disk.partitions !== null) {
        await this.nodeDiskPartitionModel.bulkCreate(
          disk.partitions.map(function (obj) {
            const diskIdentifier = `${node.name}/${createdDisk.name}`;

            return {
              ...obj,
              diskIdentifier,
            };
          })
        );
      }
    }

    await this.nodeRamModel.create({
      ...createGlobalDto.ram,
      nodeId: node.uuid,
    });
    await this.nodeCpuModel.create({
      ...createGlobalDto.cpu,
      nodeId: node.uuid,
    });

    const activeDevice = await this.activeDevicesModel.findOne({
      where: {
        nodeUuid: node.uuid,
      },
    });

    if (activeDevice) {
      await activeDevice.update({
        disks: JSON.stringify(activeDevices.disks),
        packages: JSON.stringify(activeDevices.packages),
        users: JSON.stringify(activeDevices.users),
      });
    } else {
      await this.activeDevicesModel.create({
        nodeUuid: node.uuid,
        disks: JSON.stringify(activeDevices.disks),
        packages: JSON.stringify(activeDevices.packages),
        users: JSON.stringify(activeDevices.users),
      });
    }

    //USERS AND GROUPS

    for (const user of createGlobalDto.users.users) {
      await this.nodeUserModel.create({
        username: user.username,
        groups: user.groups,
        nodeUuid: node.uuid,
      });
    }

    //PACKAGES

    const packages = createGlobalDto.packages?.packages ?? [];

    for (const nodePackage of packages) {
      await this.nodePackageModel.create({
        nodeUuid: node.uuid,
        packageName: nodePackage.packageName,
        packageVersion: nodePackage.packageVersion,
      });
    }

    return createGlobalDto;
  }

  saveLog(createGlobalDto: CreateGlobalDto) {
    fs.writeFileSync(
      'logs/createGlobalDto.json',
      JSON.stringify(createGlobalDto)
    );
  }
}
