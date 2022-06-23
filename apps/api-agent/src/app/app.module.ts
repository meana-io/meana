import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {NodeDiskPartition} from "../../../api/src/app/domains/node-disk-partitions/entities/node-disk-partition.entity";
import {GlobalModule} from "./Domains/global/global.module";
import {Dialect} from "sequelize";
import {NodeRam} from "../../../api/src/app/domains/node-ram/entities/node-ram.entity";
import {NodeCpu} from "../../../api/src/app/domains/node-cpu/entities/node-cpu.entity";
import {NodeEntity} from "../../../../libs/shared/Entities/node.entity";
import {NodeDiskEntity} from "../../../../libs/shared/Entities/node-disk.entity";

/* eslint-enable @nrwl/nx/enforce-module-boundaries */

@Module({
  imports: [
    GlobalModule,
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [NodeEntity, NodeDiskEntity, NodeDiskPartition, NodeRam, NodeCpu],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
