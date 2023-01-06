import { Module } from '@nestjs/common';
import { NodeNetworkCardsService } from './node-network-cards.service';
import { NodeNetworkCardsController } from './node-network-cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodeRamStickEntity } from '../../../../../../libs/shared/Entities/node-ram-stick.entity';
import { ActiveDevicesEntity } from '../../../../../../libs/shared/Entities/active-devices.entity';
import { NodeNetworkCardEntity } from '../../../../../../libs/shared/Entities/node-network-card.entity';
import { ApiService } from '../../common/services/api.service';

@Module({
  imports: [
    SequelizeModule.forFeature([NodeNetworkCardEntity, ActiveDevicesEntity]),
  ],
  controllers: [NodeNetworkCardsController],
  providers: [NodeNetworkCardsService, ApiService],
})
export class NodeNetworkCardsModule {}
