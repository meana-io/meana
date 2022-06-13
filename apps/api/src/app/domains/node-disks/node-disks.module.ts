import {Module} from '@nestjs/common';
import {NodeDisksService} from './node-disks.service';
import {NodeDisksController} from './node-disks.controller';
import {NodeDisk} from "./entities/node-disk.entity";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([NodeDisk])],
  controllers: [NodeDisksController],
  providers: [NodeDisksService],
})
export class NodeDisksModule {}
