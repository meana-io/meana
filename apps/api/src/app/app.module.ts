import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Node} from "./domains/nodes/entities/node.entity";
import {NodesModule} from "./domains/nodes/nodes.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeDisk} from "./domains/node-disks/entities/node-disk.entity";
import {NodeDisksModule} from "./domains/node-disks/node-disks.module";

@Module({
  imports: [NodesModule, NodeDisksModule, SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'password',
    database: 'meana',
    models: [Node, NodeDisk],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
