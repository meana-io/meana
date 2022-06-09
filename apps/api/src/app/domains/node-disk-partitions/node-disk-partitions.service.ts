import {Injectable} from '@nestjs/common';
import {CreateNodeDiskPartitionDto} from './dto/create-node-disk-partition.dto';
import {UpdateNodeDiskPartitionDto} from './dto/update-node-disk-partition.dto';
import {NodeDiskPartition} from "./entities/node-disk-partition.entity";
import {InjectModel} from "@nestjs/sequelize";
import {FindAllDto} from "../../common/findAll.dto";

@Injectable()
export class NodeDiskPartitionsService {
  constructor(@InjectModel(NodeDiskPartition) private nodeDiskPartitionModel: typeof NodeDiskPartition) {
  }
  async create(createNodeDiskPartitionDto: CreateNodeDiskPartitionDto) {
    return await this.nodeDiskPartitionModel.create({ ...createNodeDiskPartitionDto })
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.nodeDiskPartitionModel.findAll(findAllDto)
  }

  async findOne(uuid: string) {
    return await this.nodeDiskPartitionModel.findOne({ where: {
        uuid
      }})
  }

  async update(uuid: string, updateNodeDiskPartitionDto: UpdateNodeDiskPartitionDto) {
    const node = await this.nodeDiskPartitionModel.findOne({ where: {
        uuid
      }})

    await node.update({ ...updateNodeDiskPartitionDto })
    await node.save();

    return node
  }

  async deleteOne(uuid: string) {
    const node = await this.nodeDiskPartitionModel.findOne({ where: {
        uuid
      }})
    await node.destroy()

    return node
  }
}
