import {Module} from '@nestjs/common';
import {NodeRamService} from './node-ram.service';
import {NodeRamController} from './node-ram.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeRam} from "./entities/node-ram.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeRam])],
  controllers: [NodeRamController],
  providers: [NodeRamService],
})
export class NodeRamModule {}
