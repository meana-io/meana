import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/core";
import {Node} from "./entities/node.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Node])],
  controllers: [NodesController],
  providers: [NodesService, EntityRepository],
})
export class NodesModule {}
