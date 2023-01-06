import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { DashboardDto } from './dto/dashboard.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboard() {
    return this.settingsService.getDashboard();
  }

  @UseGuards(JwtAuthGuard)
  @Post('dashboard')
  setDashboard(@Body() dashboard: DashboardDto) {
    return this.settingsService.setDashboard(dashboard);
  }
}
