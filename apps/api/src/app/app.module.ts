import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {User} from "./Entities/User";

@Module({
  imports: [MikroOrmModule.forRoot({
    entities: [User],
    dbName: 'meana',
    user: 'host',
    password: '',
    port: 5432,
    host: 'localhost',
    type: 'postgresql'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
