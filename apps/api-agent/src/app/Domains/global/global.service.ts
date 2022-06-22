import {HttpException, Injectable} from '@nestjs/common';
import {CreateGlobalDto} from "./dto/create-global.dto";
import {InjectModel} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {Node} from "../../../../../api/src/app/domains/nodes/entities/node.entity";
import {NodeDisk} from "../../../../../api/src/app/domains/node-disks/entities/node-disk.entity";
import {
  NodeDiskPartition
} from "../../../../../api/src/app/domains/node-disk-partitions/entities/node-disk-partition.entity";
import {NodeRam} from "../../../../../api/src/app/domains/node-ram/entities/node-ram.entity";
import {NodeCpu} from "../../../../../api/src/app/domains/node-cpu/entities/node-cpu.entity";

/* eslint-enable @nrwl/nx/enforce-module-boundaries */

@Injectable()
export class GlobalService {
  constructor(
      @InjectModel(Node) private nodeModel: typeof Node,
      @InjectModel(NodeDisk) private nodeDiskModel: typeof NodeDisk,
      @InjectModel(NodeDiskPartition) private nodeDiskPartitionModel: typeof NodeDiskPartition,
      @InjectModel(NodeRam) private nodeRamModel: typeof NodeRam,
      @InjectModel(NodeCpu) private nodeCpuModel: typeof NodeCpu
  ) {}
  async insert(createGlobalDto: CreateGlobalDto) {
    this.nodeModel.removeAttribute('id')
    const node = await this.nodeModel.findOne({
      where: {
        uuid: createGlobalDto.nodeUuid
      }
    })

    if (node === null) {
      throw new HttpException('Node not found!', 404)
    }

    for (const disk of createGlobalDto.disks) {
      const createdDisk = await this.nodeDiskModel.create({...disk, nodeId: node.uuid})

      if (disk.partitions !== null) {
        await this.nodeDiskPartitionModel.bulkCreate(
            disk.partitions.map(
                obj => ({ ...obj, diskIdentifier: `${node.name}/${createdDisk.name}`})
            ))
      }
    }

    await this.nodeRamModel.create({ ...createGlobalDto.ram, nodeId: node.uuid })
    await this.nodeCpuModel.create({ ...createGlobalDto.cpu, nodeId: node.uuid })

    return createGlobalDto
  }
}
