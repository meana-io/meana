import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SettingsEntity } from '../../../../../../libs/shared/Entities/settings.entity';
import { DashboardDto } from './dto/dashboard.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(SettingsEntity) private settingsEntity: typeof SettingsEntity
  ) {}

  async getDashboard(userUuid: string): Promise<SettingsEntity> {
    this.settingsEntity.removeAttribute('id');

    return await this.settingsEntity.findOne({
      where: {
        key: 'dashboard',
        userUuid,
      },
    });
  }

  async setDashboard(
    dashboard: DashboardDto,
    userUuid: string
  ): Promise<SettingsEntity> {
    this.settingsEntity.removeAttribute('id');

    let dashboardEntity = await this.settingsEntity.findOne({
      where: {
        key: 'dashboard',
        userUuid: userUuid,
      },
    });

    if (dashboardEntity) {
      await dashboardEntity.update({ ...dashboard });
      await dashboardEntity.save();
    } else {
      dashboardEntity = await this.settingsEntity.create({
        key: 'dashboard',
        value: dashboard.value,
        userUuid: userUuid,
      });
    }

    return dashboardEntity;
  }
}
