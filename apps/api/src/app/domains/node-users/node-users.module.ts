import { Module } from '@nestjs/common';
import { NodeUsersService } from './node-users.service';
import { NodeUsersController } from './node-users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeUserEntity } from '../../../../../../libs/shared/Entities/node-user.entity';
import { ApiService } from '../../common/services/api.service';

@Module({
  imports: [SequelizeModule.forFeature([NodeUserEntity])],
  controllers: [NodeUsersController],
  providers: [NodeUsersService, ApiService],
})
export class NodeUsersModule {}
