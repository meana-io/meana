import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SettingsEntity } from '../../../../../../libs/shared/Entities/settings.entity';
import { DashboardDto } from './dto/dashboard.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(SettingsEntity) private settingsEntity: typeof SettingsEntity
  ) {}

  async getDashboard(): Promise<SettingsEntity> {
    this.settingsEntity.removeAttribute('id');

    return await this.settingsEntity.findOne({
      where: {
        key: 'dashboard',
      },
    });
  }

  async setDashboard(dashboard: DashboardDto): Promise<SettingsEntity> {
    this.settingsEntity.removeAttribute('id');

    let dashboardEntity = await this.settingsEntity.findOne({
      where: {
        key: 'dashboard',
      },
    });

    console.log(dashboardEntity);

    if (dashboardEntity) {
      await dashboardEntity.update({ ...dashboard });
      await dashboardEntity.save();
    } else {
      dashboardEntity = await this.settingsEntity.create({
        key: 'dashboard',
        value: dashboard.value,
      });
    }

    return dashboardEntity;
  }
}
