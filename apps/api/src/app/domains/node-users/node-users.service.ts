import { Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { NodeUserEntity } from '../../../../../../libs/shared/Entities/node-user.entity';
import { CreateNodeUserDto } from './dto/create-node-user.dto';

@Injectable()
export class NodeUsersService {
  constructor(
    @InjectModel(NodeUserEntity) private nodeUserModel: typeof NodeUserEntity
  ) {}

  async create(createNodeUserDto: CreateNodeUserDto) {
    return await this.nodeUserModel.create({ ...createNodeUserDto });
  }

  async findAll(findOptions: FindOptions) {
    return await this.nodeUserModel.findAll(findOptions);
  }
}
