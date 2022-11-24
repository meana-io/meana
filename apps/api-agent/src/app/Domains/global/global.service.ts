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
    private activeDevicesModel: typeof ActiveDevicesEntity
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
      });
    } else {
      await this.activeDevicesModel.create({
        nodeUuid: node.uuid,
        disks: JSON.stringify(activeDevices.disks),
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
