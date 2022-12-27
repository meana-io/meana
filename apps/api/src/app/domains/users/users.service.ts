import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { UserEntity } from '../../../../../../libs/shared/Entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity) private userModel: typeof UserEntity) {}
  async create(createUserDto: CreateUserDto) {
    this.userModel.removeAttribute('id');
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userModel.create({ ...createUserDto });
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      email: user.email,
      email_notifications: user.email_notifications,
      push_notifications: user.push_notifications,
      updated_at: user.updatedAt,
      uuid: user.uuid,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
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
    this.userModel.removeAttribute('id');

    const user = await this.userModel.findOne({
      where: {
        uuid,
      },
    });

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update({ ...updateUserDto });
    await user.save();

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      email: user.email,
      email_notifications: user.email_notifications,
      push_notifications: user.push_notifications,
      updated_at: user.updatedAt,
      uuid: user.uuid,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
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

  async findOneByLogin(login: string) {
    this.userModel.removeAttribute('id');

    return await this.userModel.findOne({
      where: {
        login: login,
      },
    });
  }
}
