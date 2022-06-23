import {Module} from '@nestjs/common';
import {NodeDiskPartitionsService} from './node-disk-partitions.service';
import {NodeDiskPartitionsController} from './node-disk-partitions.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeDiskPartitionEntity} from "../../../../../../libs/shared/Entities/node-disk-partition.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeDiskPartitionEntity])],
  controllers: [NodeDiskPartitionsController],
  providers: [NodeDiskPartitionsService],
})
export class NodeDiskPartitionsModule {}
