import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAllDto } from '../../common/findAll.dto';
import { CreateNodeDiskDto } from './dto/create-node-disk.dto';
import { NodeDiskEntity } from '../../../../../../libs/shared/Entities/node-disk.entity';
import { FindOptions } from 'sequelize';

@Injectable()
export class NodeDisksService {
  constructor(
    @InjectModel(NodeDiskEntity) private nodeDiskModel: typeof NodeDiskEntity
  ) {}
  async create(createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeDiskModel.create({ ...createNodeDiskDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeDiskModel.findAll(findOptions);
  }
  //
  // async findOne(uuid: string) {
  //   return await this.nodeDiskModel.findOne({ where: {
  //       serialNumber: uuid
  //     }})
  // }
  //
  // async update(uuid: string, updateNodeDiskDto: UpdateNodeDiskDto) {
  //   const node = await this.nodeDiskModel.findOne({ where: {
  //       serialNumber: uuid
  //     }})
  //
  //   await node.update({ ...updateNodeDiskDto })
  //   await node.save();
  //
  //   return node
  // }
  //
  // async deleteOne(uuid: string) {
  //   const node = await this.nodeDiskModel.findOne({ where: {
  //       serialNumber: uuid
  //     }})
  //   await node.destroy()
  //
  //   return node
  // }
}
