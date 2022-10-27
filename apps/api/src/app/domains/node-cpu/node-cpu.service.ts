import { Injectable } from '@nestjs/common';
import { CreateNodeDiskDto } from '../node-disks/dto/create-node-disk.dto';
import { FindAllDto } from '../../common/findAll.dto';
import { InjectModel } from '@nestjs/sequelize';
import { NodeCpuEntity } from '../../../../../../libs/shared/Entities/node-cpu.entity';
import { FindOptions } from 'sequelize';

@Injectable()
export class NodeCpuService {
  constructor(
    @InjectModel(NodeCpuEntity) private nodeCpuModel: typeof NodeCpuEntity
  ) {}

  async create(createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeCpuModel.create({ ...createNodeDiskDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeCpuModel.findAll(findOptions);
  }
}
