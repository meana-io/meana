import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NodesModule} from "./domains/nodes/nodes.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeDisksModule} from "./domains/node-disks/node-disks.module";
import {NodeDiskPartitionsModule} from "./domains/node-disk-partitions/node-disk-partitions.module";
import {Dialect} from "sequelize";
import {NodeRamModule} from "./domains/node-ram/node-ram.module";
import {NodeRam} from "./domains/node-ram/entities/node-ram.entity";
import {NodeCpu} from "./domains/node-cpu/entities/node-cpu.entity";
import {NodeCpuModule} from "./domains/node-cpu/node-cpu.module";
import {NodeEntity} from "../../../../libs/shared/Entities/node.entity";
import {NodeDiskEntity} from "../../../../libs/shared/Entities/node-disk.entity";
import {NodeDiskPartitionEntity} from "../../../../libs/shared/Entities/node-disk-partition.entity";

@Module({
  imports: [NodesModule, NodeDisksModule, NodeDiskPartitionsModule, NodeRamModule, NodeCpuModule, SequelizeModule.forRoot({
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    models: [NodeEntity, NodeDiskEntity, NodeDiskPartitionEntity, NodeRam, NodeCpu],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
