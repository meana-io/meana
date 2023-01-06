import { Module } from '@nestjs/common';
import { NodeDevicesService } from './node-devices.service';
import { NodeDevicesController } from './node-devices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeDeviceEntity } from '../../../../../../libs/shared/Entities/node-device.entity';
import { ApiService } from '../../common/services/api.service';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([NodeDeviceEntity, ActiveDevicesEntity]),
  ],
  controllers: [NodeDevicesController],
  providers: [NodeDevicesService, ApiService],
})
export class NodeDevicesModule {}
