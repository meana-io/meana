import {Module} from '@nestjs/common';
import {GlobalService} from './global.service';
import {GlobalController} from './global.controller';
import {SequelizeModule} from "@nestjs/sequelize";
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {NodeDisk} from "../../../../../api/src/app/domains/node-disks/entities/node-disk.entity";
import {Node} from "../../../../../api/src/app/domains/nodes/entities/node.entity";
import {
  NodeDiskPartition
} from "../../../../../api/src/app/domains/node-disk-partitions/entities/node-disk-partition.entity";
import {NodeRam} from "../../../../../api/src/app/domains/node-ram/entities/node-ram.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeDiskPartition, NodeDisk, Node, NodeRam])],
  controllers: [GlobalController],
  providers: [GlobalService],
})
export class GlobalModule {}
