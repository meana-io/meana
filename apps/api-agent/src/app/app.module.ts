import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {Node} from "../../../api/src/app/domains/nodes/entities/node.entity";
import {NodeDisk} from "../../../api/src/app/domains/node-disks/entities/node-disk.entity";
import {NodeDiskPartition} from "../../../api/src/app/domains/node-disk-partitions/entities/node-disk-partition.entity";
import {GlobalModule} from "./Domains/global/global.module";
/* eslint-enable @nrwl/nx/enforce-module-boundaries */

@Module({
  imports: [
    GlobalModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'meana',
      models: [Node, NodeDisk, NodeDiskPartition],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
