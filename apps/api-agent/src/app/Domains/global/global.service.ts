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
import { AmqpConnectionService } from '../../../../../../libs/services/amqp/amqp-connection.service';
import axios from 'axios';
import { DateTime } from 'luxon';
import { NodeDeviceEntity } from '../../../../../../libs/shared/Entities/node-device.entity';
import { NodeRamStickEntity } from '../../../../../../libs/shared/Entities/node-ram-stick.entity';
import { NodeNetworkCardEntity } from '../../../../../../libs/shared/Entities/node-network-card.entity';

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
    private nodePackageModel: typeof NodePackageEntity,
    @InjectModel(NodeDeviceEntity)
    private nodeDevicesModel: typeof NodeDeviceEntity,
    @InjectModel(NodeRamStickEntity)
    private nodeRamStickModel: typeof NodeRamStickEntity,
    @InjectModel(NodeNetworkCardEntity)
    private nodeNetworkCardEntity: typeof NodeNetworkCardEntity
  ) {}
  async insert(createGlobalDto: CreateGlobalDto) {
    GlobalService.saveLog(createGlobalDto);

    const detailedDto = {
      nodeUuid: createGlobalDto.nodeUuid,
      cpu: createGlobalDto.cpu,
      disks: createGlobalDto.disks,
      ram: createGlobalDto.ram,
      networkCards: createGlobalDto.networkCards,
    };

    const message = {
      message: JSON.stringify(detailedDto),
      queue: 'meana_agent',
    };
    AmqpConnectionService.sendMessage(message);

    if (createGlobalDto.packages) {
      const packageMessage = {
        message: JSON.stringify({
          nodeUuid: createGlobalDto.nodeUuid,
          packages: createGlobalDto.packages.packages,
        }),
        queue: 'meana_packages',
      };
      AmqpConnectionService.sendMessage(packageMessage);
    }

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

    node.last_update_at = DateTime.now().toISO();
    node.save();

    const activeDevices = {
      disks: createGlobalDto.disks,
      // packages: createGlobalDto.packages?.packages,
      users: createGlobalDto.users.users,
      devices: createGlobalDto?.devices,
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

    //DEVICES

    if (createGlobalDto.devices) {
      for (const device of createGlobalDto.devices) {
        await this.nodeDevicesModel.create({ nodeUuid: node.uuid, ...device });
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
        disks: JSON.stringify(
          createGlobalDto.disks.map((disk) => ({
            ...disk,
            partitions: disk.partitions?.map((partition) => ({
              ...partition,
              diskIdentifier: `${node.name}/${disk.name}`,
            })),
          }))
        ),
        // packages: JSON.stringify(activeDevices.packages),
        users: JSON.stringify(createGlobalDto.users),
        devices: JSON.stringify(createGlobalDto?.devices),
        ramSticks: JSON.stringify(createGlobalDto?.ram.rams),
        networkCards: JSON.stringify(createGlobalDto?.networkCards),
      });
    } else {
      await this.activeDevicesModel.create({
        nodeUuid: node.uuid,
        disks: JSON.stringify(createGlobalDto.disks),
        // packages: JSON.stringify(activeDevices.packages),
        users: JSON.stringify(createGlobalDto.users),
        devices: JSON.stringify(createGlobalDto?.devices),
        ramSticks: JSON.stringify(createGlobalDto?.ram.rams),
        networkCards: JSON.stringify(createGlobalDto?.networkCards),
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

    //RAM STICKS

    const ramSticks = createGlobalDto.ram?.rams ?? [];

    for (const ramStick of ramSticks) {
      await this.nodeRamStickModel.create({
        nodeUuid: node.uuid,
        ...ramStick,
      });
    }

    //NETWORK CARDS

    const networkCards = createGlobalDto.networkCards ?? [];

    for (const networkCard of networkCards) {
      await this.nodeNetworkCardEntity.create({
        nodeUuid: node.uuid,
        ...networkCard,
      });
    }

    return createGlobalDto;
  }

  private static saveLog(createGlobalDto: CreateGlobalDto) {
    fs.writeFileSync(
      'logs/createGlobalDto.json',
      JSON.stringify(createGlobalDto)
    );
  }
}
