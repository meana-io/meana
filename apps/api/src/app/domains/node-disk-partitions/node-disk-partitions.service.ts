import {Injectable} from '@nestjs/common';
import {CreateNodeDiskPartitionDto} from './dto/create-node-disk-partition.dto';
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
  //
  // async findOne(nodeDiskId: string) {
  //   return await this.nodeDiskPartitionModel.findOne({ where: {
  //       nodeDiskId
  //     }})
  // }
  //
  // async update(nodeDiskId: string, updateNodeDiskPartitionDto: UpdateNodeDiskPartitionDto) {
  //   const node = await this.nodeDiskPartitionModel.findOne({ where: {
  //       nodeDiskId
  //     }})
  //
  //   await node.update({ ...updateNodeDiskPartitionDto })
  //   await node.save();
  //
  //   return node
  // }
  //
  // async deleteOne(nodeDiskId: string) {
  //   const node = await this.nodeDiskPartitionModel.findOne({ where: {
  //       nodeDiskId
  //     }})
  //   await node.destroy()
  //
  //   return node
  // }
}
