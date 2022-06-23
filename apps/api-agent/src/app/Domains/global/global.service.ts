import {HttpException, Injectable} from '@nestjs/common';
import {CreateGlobalDto} from "./dto/create-global.dto";
import {InjectModel} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {NodeCpu} from "../../../../../api/src/app/domains/node-cpu/entities/node-cpu.entity";
import {NodeEntity} from "../../../../../../libs/shared/Entities/node.entity";
import {NodeDiskEntity} from "../../../../../../libs/shared/Entities/node-disk.entity";
import {NodeDiskPartitionEntity} from "../../../../../../libs/shared/Entities/node-disk-partition.entity";
import {NodeRamEntity} from "../../../../../../libs/shared/Entities/node-ram.entity";

/* eslint-enable @nrwl/nx/enforce-module-boundaries */

@Injectable()
export class GlobalService {
  constructor(
      @InjectModel(NodeEntity) private nodeModel: typeof NodeEntity,
      @InjectModel(NodeDiskEntity) private nodeDiskModel: typeof NodeDiskEntity,
      @InjectModel(NodeDiskPartitionEntity) private nodeDiskPartitionModel: typeof NodeDiskPartitionEntity,
      @InjectModel(NodeRamEntity) private nodeRamModel: typeof NodeRamEntity,
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
