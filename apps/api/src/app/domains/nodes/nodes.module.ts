import {Module} from '@nestjs/common';
import {NodesService} from './nodes.service';
import {NodesController} from './nodes.controller';
import {EntityRepository} from "@mikro-orm/core";
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeEntity} from "../../../../../../libs/shared/Entities/node.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeEntity])],
  controllers: [NodesController],
  providers: [NodesService, EntityRepository],
})
export class NodesModule {}
