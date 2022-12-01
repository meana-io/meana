import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { DashboardDto } from './dto/dashboard.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('dashboard')
  getDashboard() {
    return this.settingsService.getDashboard();
  }

  @Post('dashboard')
  setDashboard(@Body() dashboard: DashboardDto) {
    return this.settingsService.setDashboard(dashboard);
  }
}
