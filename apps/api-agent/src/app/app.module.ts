import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'meana',
      models: [Cat],
    }),
      SequelizeModule.forFeature([Cat])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
