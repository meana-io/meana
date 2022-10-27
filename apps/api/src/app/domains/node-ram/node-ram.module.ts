import { Module } from '@nestjs/common';
import { NodeRamService } from './node-ram.service';
import { NodeRamController } from './node-ram.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeRamEntity } from '../../../../../../libs/shared/Entities/node-ram.entity';
import { ApiService } from '../../common/services/api.service';

@Module({
  imports: [SequelizeModule.forFeature([NodeRamEntity])],
  controllers: [NodeRamController],
  providers: [NodeRamService, ApiService],
})
export class NodeRamModule {}
