import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNodeRamDto } from './dto/create-node-ram.dto';
import { NodeRamEntity } from '../../../../../../libs/shared/Entities/node-ram.entity';
import { FindOptions } from 'sequelize';

@Injectable()
export class NodeRamService {
  constructor(
    @InjectModel(NodeRamEntity) private nodeRamModel: typeof NodeRamEntity
  ) {}
  async create(createNodeRamDto: CreateNodeRamDto) {
    return await this.nodeRamModel.create({ ...createNodeRamDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeRamModel.findAll(findOptions);
  }
}
