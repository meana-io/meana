import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { UserEntity } from '../../../../../../libs/shared/Entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity) private userModel: typeof UserEntity) {}
  async create(createUserDto: CreateUserDto) {
    this.userModel.removeAttribute('id');

    return await this.userModel.create({ ...createUserDto });
  }

  async findAll(findOptions: FindOptions) {
    this.userModel.removeAttribute('id');

    return await this.userModel.findAll(findOptions);
  }

  async findOne(uuid: string) {
    this.userModel.removeAttribute('id');

    return await this.userModel.findOne({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const node = await this.userModel.findOne({
      where: {
        uuid,
      },
    });

    await node.update({ ...updateUserDto });
    await node.save();

    return node;
  }

  async deleteOne(uuid: string) {
    const node = await this.userModel.findOne({
      where: {
        uuid,
      },
    });
    await node.destroy();

    return node;
  }
}
