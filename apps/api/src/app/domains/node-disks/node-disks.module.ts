import { Module } from '@nestjs/common';
import { NodeDisksService } from './node-disks.service';
import { NodeDisksController } from './node-disks.controller';

@Module({
  controllers: [NodeDisksController],
  providers: [NodeDisksService],
})
export class NodeDisksModule {}
