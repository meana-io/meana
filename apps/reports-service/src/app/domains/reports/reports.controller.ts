import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportRequestDto } from './dto/report-request.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate')
  async generate(@Body() reportRequestDto: ReportRequestDto) {
    return await this.reportsService.generate(reportRequestDto);
  }
}
