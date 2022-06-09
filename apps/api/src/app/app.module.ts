import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {Node} from "./domains/nodes/entities/node.entity";
import {NodesModule} from "./domains/nodes/nodes.module";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [NodesModule, SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'password',
    database: 'meana',
    models: [Node],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
