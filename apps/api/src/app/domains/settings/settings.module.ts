import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SettingsEntity } from '../../../../../../libs/shared/Entities/settings.entity';

@Module({
  imports: [SequelizeModule.forFeature([SettingsEntity])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
