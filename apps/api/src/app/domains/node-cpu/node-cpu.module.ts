import { Module } from '@nestjs/common';
import { NodeCpuService } from './node-cpu.service';
import { NodeCpuController } from './node-cpu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeCpuEntity } from '../../../../../../libs/shared/Entities/node-cpu.entity';
import { ApiService } from '../../common/services/api.service';

@Module({
  imports: [SequelizeModule.forFeature([NodeCpuEntity])],
  controllers: [NodeCpuController],
  providers: [NodeCpuService, ApiService],
})
export class NodeCpuModule {}
