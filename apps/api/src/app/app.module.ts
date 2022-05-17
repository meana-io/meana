import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {NodeDisk} from "./domains/node-disks/entities/node-disk.entity";
import {Node} from "./domains/nodes/entities/node.entity";

@Module({
  imports: [MikroOrmModule.forRoot({
    entities: [Node, NodeDisk],
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
