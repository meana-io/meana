import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import {EntityRepository} from "@mikro-orm/core";
import {Node} from "./entities/node.entity";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Node])],
  controllers: [NodesController],
  providers: [NodesService, EntityRepository],
})
export class NodesModule {}
