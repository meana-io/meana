import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { DashboardDto } from './dto/dashboard.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard/:userUuid')
  getDashboard(@Param('userUuid') userUuid: string) {
    return this.settingsService.getDashboard(userUuid);
  }

  @UseGuards(JwtAuthGuard)
  @Post('dashboard/:userUuid')
  setDashboard(
    @Param('userUuid') userUuid: string,
    @Body() dashboard: DashboardDto
  ) {
    return this.settingsService.setDashboard(dashboard, userUuid);
  }
}
