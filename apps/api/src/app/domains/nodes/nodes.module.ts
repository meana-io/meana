import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeEntity } from '../../../../../../libs/shared/Entities/node.entity';
import { ApiService } from '../../common/services/api.service';

@Module({
  imports: [SequelizeModule.forFeature([NodeEntity])],
  controllers: [NodesController],
  providers: [NodesService, ApiService],
})
export class NodesModule {}
