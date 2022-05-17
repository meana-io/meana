import { Module } from '@nestjs/common';
import { NodeDisksService } from './node-disks.service';
import { NodeDisksController } from './node-disks.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {NodeDisk} from "./entities/node-disk.entity";

@Module({
  imports: [MikroOrmModule.forFeature([NodeDisk])],
  controllers: [NodeDisksController],
  providers: [NodeDisksService],
})
export class NodeDisksModule {}
