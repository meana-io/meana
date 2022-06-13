import { Module } from '@nestjs/common';
import { NodeCpuService } from './node-cpu.service';
import { NodeCpuController } from './node-cpu.controller';

@Module({
  controllers: [NodeCpuController],
  providers: [NodeCpuService],
})
export class NodeCpuModule {}
