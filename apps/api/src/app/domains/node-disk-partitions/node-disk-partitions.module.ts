import { Module } from '@nestjs/common';
import { NodeDiskPartitionsService } from './node-disk-partitions.service';
import { NodeDiskPartitionsController } from './node-disk-partitions.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {NodeDiskPartition} from "./entities/node-disk-partition.entity";

@Module({
  imports: [MikroOrmModule.forFeature([NodeDiskPartition])],
  controllers: [NodeDiskPartitionsController],
  providers: [NodeDiskPartitionsService],
})
export class NodeDiskPartitionsModule {}
