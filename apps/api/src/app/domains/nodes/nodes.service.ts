import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { NodeEntity } from '../../../../../../libs/shared/Entities/node.entity';
import { FindOptions } from 'sequelize';

@Injectable()
export class NodesService {
  constructor(@InjectModel(NodeEntity) private nodeModel: typeof NodeEntity) {}
  async create(createNodeDto: CreateNodeDto) {
    this.nodeModel.removeAttribute('id');

    return await this.nodeModel.create({ ...createNodeDto });
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
}
