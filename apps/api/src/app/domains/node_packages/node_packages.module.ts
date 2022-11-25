import { Module } from '@nestjs/common';
import { NodePackagesService } from './node_packages.service';
import { NodePackagesController } from './node_packages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodePackageEntity } from '../../../../../../libs/shared/Entities/node-package.entity';
import { ApiService } from '../../common/services/api.service';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([NodePackageEntity, ActiveDevicesEntity]),
  ],
  controllers: [NodePackagesController],
  providers: [NodePackagesService, ApiService],
})
export class NodePackagesModule {}
