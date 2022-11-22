import { Module } from '@nestjs/common';
import { ReportsModule } from './domains/reports/reports.module';

@Module({
  imports: [ReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
