import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { NodePackageEntity } from '../../../../../../libs/shared/Entities/node-package.entity';
import { CreateNodePackageDto } from './dto/create-node_package.dto';

@Injectable()
export class NodePackagesService {
  constructor(
    @InjectModel(NodePackageEntity)
    private nodePackageModel: typeof NodePackageEntity
  ) {}

  async create(createNodePackageDto: CreateNodePackageDto) {
    return await this.nodePackageModel.create({ ...createNodePackageDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodePackageModel.findAll(findOptions);
  }
}
