import {Module} from '@nestjs/common';
import {NodeCpuService} from './node-cpu.service';
import {NodeCpuController} from './node-cpu.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeCpu} from "./entities/node-cpu.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeCpu])],
  controllers: [NodeCpuController],
  providers: [NodeCpuService],
})
export class NodeCpuModule {}
