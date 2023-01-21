import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { NodeEntity } from '../../../../../../libs/shared/Entities/node.entity';
import { FindOptions } from 'sequelize';
import { NodeThresholdEntity } from '../../../../../../libs/shared/Entities/node-threshold.entity';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(NodeEntity) private nodeModel: typeof NodeEntity,
    @InjectModel(NodeThresholdEntity)
    private nodeThresholdModel: typeof NodeThresholdEntity
  ) {}
  async create(createNodeDto: CreateNodeDto) {
    this.nodeModel.removeAttribute('id');
    this.nodeThresholdModel.removeAttribute('id');

    const node = await this.nodeModel.create({ ...createNodeDto });

    await this.nodeThresholdModel.create({ nodeUuid: node.uuid });

    return node;
  }

  async findAll(findOptions: FindOptions) {
    this.nodeModel.removeAttribute('id');

    return await this.nodeModel.findAll(findOptions);
  }

  async findOne(uuid: string) {
    this.nodeModel.removeAttribute('id');

    return await this.nodeModel.findOne({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: string, updateNodeDto: UpdateNodeDto) {
    const node = await this.nodeModel.findOne({
      where: {
        uuid,
      },
    });

    await node.update({ ...updateNodeDto });
    await node.save();

    return node;
  }

  async deleteOne(uuid: string) {
    const node = await this.nodeModel.findOne({
      where: {
        uuid,
      },
    });
    await node.destroy();

    return node;
  }

  async getHealth(uuid: string) {
    this.nodeModel.removeAttribute('id');

    const node = await this.nodeModel.findOne({
      where: {
        uuid: uuid,
      },
    });

    return Date.parse(node.last_update_at) + 60_000 > Date.now();
  }
}
