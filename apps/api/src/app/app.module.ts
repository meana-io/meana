import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {NodeDisk} from "./domains/node-disks/entities/node-disk.entity";
import {Node} from "./domains/nodes/entities/node.entity";
import {NodesModule} from "./domains/nodes/nodes.module";
import {NodeDisksModule} from "./domains/node-disks/node-disks.module";
import {NodeDiskPartition} from "./domains/node-disk-partitions/entities/node-disk-partition.entity";
import {NodeDiskPartitionsModule} from "./domains/node-disk-partitions/node-disk-partitions.module";

@Module({
  imports: [NodesModule, NodeDisksModule, NodeDiskPartitionsModule, MikroOrmModule.forRoot({
    entities: [Node, NodeDisk, NodeDiskPartition],
    dbName: 'meana',
    user: 'postgres',
    password: '',
    port: 5432,
    host: 'localhost',
    type: 'postgresql'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
