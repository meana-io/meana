import { Injectable } from '@nestjs/common';
import { CreateNodeDiskPartitionDto } from './dto/create-node-disk-partition.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FindAllDto } from '../../common/findAll.dto';
import { NodeDiskPartitionEntity } from '../../../../../../libs/shared/Entities/node-disk-partition.entity';
import { FindOptions } from 'sequelize';

@Injectable()
export class NodeDiskPartitionsService {
  constructor(
    @InjectModel(NodeDiskPartitionEntity)
    private nodeDiskPartitionModel: typeof NodeDiskPartitionEntity
  ) {}
  async create(createNodeDiskPartitionDto: CreateNodeDiskPartitionDto) {
    return await this.nodeDiskPartitionModel.create({
      ...createNodeDiskPartitionDto,
    });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeDiskPartitionModel.findAll(findOptions);
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
