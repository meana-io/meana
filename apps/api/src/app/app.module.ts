import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Node} from "./domains/nodes/entities/node.entity";
import {NodesModule} from "./domains/nodes/nodes.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeDisk} from "./domains/node-disks/entities/node-disk.entity";
import {NodeDisksModule} from "./domains/node-disks/node-disks.module";
import {NodeDiskPartition} from "./domains/node-disk-partitions/entities/node-disk-partition.entity";
import {NodeDiskPartitionsModule} from "./domains/node-disk-partitions/node-disk-partitions.module";

@Module({
  imports: [NodesModule, NodeDisksModule, NodeDiskPartitionsModule, SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'docker_postgres_1',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'meana',
    models: [Node, NodeDisk, NodeDiskPartition],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
