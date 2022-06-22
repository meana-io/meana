import {Module} from '@nestjs/common';
import {NodeDiskPartitionsService} from './node-disk-partitions.service';
import {NodeDiskPartitionsController} from './node-disk-partitions.controller';
import {NodeDiskPartition} from "./entities/node-disk-partition.entity";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([NodeDiskPartition])],
  controllers: [NodeDiskPartitionsController],
  providers: [NodeDiskPartitionsService],
})
export class NodeDiskPartitionsModule {}
