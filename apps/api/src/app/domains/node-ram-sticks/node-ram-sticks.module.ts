import { Module } from '@nestjs/common';
import { NodeRamSticksService } from './node-ram-sticks.service';
import { NodeRamSticksController } from './node-ram-sticks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeRamStickEntity } from '../../../../../../libs/shared/Entities/node-ram-stick.entity';
import { ApiService } from '../../common/services/api.service';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([NodeRamStickEntity, ActiveDevicesEntity]),
  ],
  controllers: [NodeRamSticksController],
  providers: [NodeRamSticksService, ApiService],
})
export class NodeRamSticksModule {}
