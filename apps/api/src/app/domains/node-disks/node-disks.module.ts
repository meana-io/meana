import {Module} from '@nestjs/common';
import {NodeDisksService} from './node-disks.service';
import {NodeDisksController} from './node-disks.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {NodeDiskEntity} from "../../../../../../libs/shared/Entities/node-disk.entity";

@Module({
  imports: [SequelizeModule.forFeature([NodeDiskEntity])],
  controllers: [NodeDisksController],
  providers: [NodeDisksService],
})
export class NodeDisksModule {}
