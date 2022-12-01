import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { NodeThresholdEntity } from '../../../../../../libs/shared/Entities/node-threshold.entity';
import { CreateNodeThresholdDto } from './dto/create-node-threshold.dto';
import { UpdateNodeThresholdDto } from './dto/update-node-threshold.dto';

@Injectable()
export class NodeThresholdsService {
  constructor(
    @InjectModel(NodeThresholdEntity)
    private nodeThresholdModel: typeof NodeThresholdEntity
  ) {}
  async create(createNodeThresholdDto: CreateNodeThresholdDto) {
    this.nodeThresholdModel.removeAttribute('id');

    return await this.nodeThresholdModel.create({ ...createNodeThresholdDto });
  }

  async findAll(findOptions: FindOptions) {
    this.nodeThresholdModel.removeAttribute('id');

    return await this.nodeThresholdModel.findAll(findOptions);
  }

  async findOne(uuid: string) {
    this.nodeThresholdModel.removeAttribute('id');

    return await this.nodeThresholdModel.findOne({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: string, updateNodeThresholdDto: UpdateNodeThresholdDto) {
    const node = await this.nodeThresholdModel.findOne({
      where: {
        uuid,
      },
    });

    await node.update({ ...updateNodeThresholdDto });
    await node.save();

    return node;
  }

  async deleteOne(uuid: string) {
    const node = await this.nodeThresholdModel.findOne({
      where: {
        uuid,
      },
    });
    await node.destroy();

    return node;
  }
}
