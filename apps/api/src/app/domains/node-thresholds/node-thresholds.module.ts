import { Module } from '@nestjs/common';
import { NodeThresholdsService } from './node-thresholds.service';
import { NodeThresholdsController } from './node-thresholds.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeThresholdEntity } from '../../../../../../libs/shared/Entities/node-threshold.entity';
import { ApiService } from '../../common/services/api.service';

@Module({
  imports: [SequelizeModule.forFeature([NodeThresholdEntity])],
  controllers: [NodeThresholdsController],
  providers: [NodeThresholdsService, ApiService],
})
export class NodeThresholdsModule {}
