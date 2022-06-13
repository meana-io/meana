import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateGlobalDto, Disk} from "./dto/create-global.dto";
import {InjectModel} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {Node} from "../../../../../api/src/app/domains/nodes/entities/node.entity";
import {NodeDisk} from "../../../../../api/src/app/domains/node-disks/entities/node-disk.entity";
import {
  NodeDiskPartition
} from "../../../../../api/src/app/domains/node-disk-partitions/entities/node-disk-partition.entity";
import {NodeRam} from "../../../../../api/src/app/domains/node-ram/entities/node-ram.entity";

/* eslint-enable @nrwl/nx/enforce-module-boundaries */

@Injectable()
export class GlobalService {
  constructor(
      @InjectModel(Node) private nodeModel: typeof Node,
      @InjectModel(NodeDisk) private nodeDiskModel: typeof NodeDisk,
      @InjectModel(NodeDiskPartition) private nodeDiskPartitionModel: typeof NodeDiskPartition,
      @InjectModel(NodeRam) private nodeRamModel: typeof NodeRam
  ) {}
  async insert(createGlobalDto: CreateGlobalDto) {
    this.nodeModel.removeAttribute('id')
    const node = await this.nodeModel.findOne({
      where: {
        name: createGlobalDto.name
      }
    })

    if (node === null) {
      throw new HttpException('Node not found!', 404)
    }

    createGlobalDto.disks.forEach(async (disk: Disk) => {
      const createdDisk = await this.nodeDiskModel.create({...disk, nodeId: node.uuid})

      if (disk.partitions !== null) {
        await this.nodeDiskPartitionModel.bulkCreate(disk.partitions.map(obj => ({ ...obj, diskSerialNumber: createdDisk.serialNumber})))
      }
    })

    await this.nodeRamModel.create({ ...createGlobalDto.ram, nodeId: node.uuid })

    // const disks = await this.nodeDiskModel.bulkCreate(createGlobalDto.disks.map(obj => ({ ...obj, nodeId: node.uuid})))

    // createGlobalDto.disks.forEach((disk: Disk) => {
    //   console.log(disks)
    //
    //   // await this.nodeDiskPartitionModel.bulkCreate(disk.partitions.map(obj => ({ ...obj, nodeDiskId})))
    // })

    // await this.nodeDiskPartitionModel.bulkCreate(createGlobalDto.nodeDiskPartitions.map(obj => ({ ...obj, nodeDiskId})))

    return createGlobalDto
  }
}
