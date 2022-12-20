import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { NodeRamStickEntity } from '../../../../../../libs/shared/Entities/node-ram-stick.entity';
import { CreateNodeRamStickDto } from './dto/create-node-ram-stick.dto';

@Injectable()
export class NodeRamSticksService {
  constructor(
    @InjectModel(NodeRamStickEntity)
    private nodeRamStickModel: typeof NodeRamStickEntity
  ) {}

  async create(createNodeRamStickDto: CreateNodeRamStickDto) {
    return await this.nodeRamStickModel.create({ ...createNodeRamStickDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeRamStickModel.findAll(findOptions);
  }
}
