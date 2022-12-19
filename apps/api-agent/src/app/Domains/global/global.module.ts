import { Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { SequelizeModule } from '@nestjs/sequelize';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NodeEntity } from '../../../../../../libs/shared/Entities/node.entity';
import { NodeDiskEntity } from '../../../../../../libs/shared/Entities/node-disk.entity';
import { NodeDiskPartitionEntity } from '../../../../../../libs/shared/Entities/node-disk-partition.entity';
import { NodeRamEntity } from '../../../../../../libs/shared/Entities/node-ram.entity';
import { NodeCpuEntity } from '../../../../../../libs/shared/Entities/node-cpu.entity';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';
import { NodeUserEntity } from '../../../../../../libs/shared/Entities/node-user.entity';
import { NodePackageEntity } from '../../../../../../libs/shared/Entities/node-package.entity';
import { NodeDeviceEntity } from '../../../../../../libs/shared/Entities/node-device.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      NodeDiskPartitionEntity,
      NodeDiskEntity,
      NodeEntity,
      NodeRamEntity,
      NodeCpuEntity,
      ActiveDevicesEntity,
      NodeUserEntity,
      NodePackageEntity,
      NodeDeviceEntity,
    ]),
  ],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
