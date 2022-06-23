import {Module} from '@nestjs/common';
import {GlobalService} from './global.service';
import {GlobalController} from './global.controller';
import {SequelizeModule} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {NodeRam} from "../../../../../api/src/app/domains/node-ram/entities/node-ram.entity";
import {NodeCpu} from "../../../../../api/src/app/domains/node-cpu/entities/node-cpu.entity";
import {NodeEntity} from "../../../../../../libs/shared/Entities/node.entity";
import {NodeDiskEntity} from "../../../../../../libs/shared/Entities/node-disk.entity";
import {NodeDiskPartitionEntity} from "../../../../../../libs/shared/Entities/node-disk-partition.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeDiskPartitionEntity, NodeDiskEntity, NodeEntity, NodeRam, NodeCpu])],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
