import {Module} from '@nestjs/common';
import {NodeRamService} from './node-ram.service';
import {NodeRamController} from './node-ram.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeRamEntity} from "../../../../../../libs/shared/Entities/node-ram.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeRamEntity])],
  controllers: [NodeRamController],
  providers: [NodeRamService],
})
export class NodeRamModule {}
