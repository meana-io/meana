import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodesModule } from './domains/nodes/nodes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeDisksModule } from './domains/node-disks/node-disks.module';
import { NodeDiskPartitionsModule } from './domains/node-disk-partitions/node-disk-partitions.module';
import { Dialect } from 'sequelize';
import { NodeRamModule } from './domains/node-ram/node-ram.module';
import { NodeCpuModule } from './domains/node-cpu/node-cpu.module';
import { NodeEntity } from '../../../../libs/shared/Entities/node.entity';
import { NodeDiskEntity } from '../../../../libs/shared/Entities/node-disk.entity';
import { NodeDiskPartitionEntity } from '../../../../libs/shared/Entities/node-disk-partition.entity';
import { NodeRamEntity } from '../../../../libs/shared/Entities/node-ram.entity';
import { NodeCpuEntity } from '../../../../libs/shared/Entities/node-cpu.entity';
import { SettingsEntity } from '../../../../libs/shared/Entities/settings.entity';
import { SettingsModule } from './domains/settings/settings.module';
import { UsersModule } from './domains/users/users.module';
import { UserEntity } from '../../../../libs/shared/Entities/user.entity';
import { ActiveDevicesEntity } from '../../../../libs/shared/Entities/active-devices.entity';
import { ReportsModule } from './domains/reports/reports.module';
import { LogsModule } from './domains/logs/logs.module';

@Module({
  imports: [
    NodesModule,
    NodeDisksModule,
    NodeDiskPartitionsModule,
    NodeRamModule,
    NodeCpuModule,
    SettingsModule,
    UsersModule,
    ReportsModule,
    LogsModule,
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        NodeEntity,
        NodeDiskEntity,
        NodeDiskPartitionEntity,
        NodeRamEntity,
        NodeCpuEntity,
        SettingsEntity,
        UserEntity,
        ActiveDevicesEntity,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
