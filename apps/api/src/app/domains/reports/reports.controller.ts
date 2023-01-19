import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportRequestDto } from './dto/report-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generate(@Body() reportRequestDto: ReportRequestDto) {
    return await this.reportsService.generate(reportRequestDto);
  }
}
