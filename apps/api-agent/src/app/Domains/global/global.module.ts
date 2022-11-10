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

@Module({
  imports: [
    SequelizeModule.forFeature([
      NodeDiskPartitionEntity,
      NodeDiskEntity,
      NodeEntity,
      NodeRamEntity,
      NodeCpuEntity,
      ActiveDevicesEntity,
    ]),
  ],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
