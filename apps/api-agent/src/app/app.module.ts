import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {GlobalModule} from "./Domains/global/global.module";
import {Dialect} from "sequelize";
import {NodeEntity} from "../../../../libs/shared/Entities/node.entity";
import {NodeDiskEntity} from "../../../../libs/shared/Entities/node-disk.entity";
import {NodeDiskPartitionEntity} from "../../../../libs/shared/Entities/node-disk-partition.entity";
import {NodeRamEntity} from "../../../../libs/shared/Entities/node-ram.entity";
import {NodeCpuEntity} from "../../../../libs/shared/Entities/node-cpu.entity";

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
      models: [NodeEntity, NodeDiskEntity, NodeDiskPartitionEntity, NodeRamEntity, NodeCpuEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
