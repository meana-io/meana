import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { DashboardDto } from './dto/dashboard.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // @Post()
  // create(@Body() createSettingDto: DashboardDto) {
  //   return this.settingsService.create(createSettingDto);
  // }

  @Get('dashboard')
  findOne() {
    return this.settingsService.getDashboard();
  }

  @Post('dashboard')
  createOne(@Body() dashboard: DashboardDto) {
    return this.settingsService.setDashboard(dashboard);
  }
}
