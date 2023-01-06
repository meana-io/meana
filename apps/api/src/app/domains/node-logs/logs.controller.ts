import {
  Controller,
  Get,
  NotFoundException,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import * as fs from 'fs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getLog(
    @Query('nodeUuid') nodeUuid: string,
    @Query('filename') filename: string
  ) {
    const filePath = `storage/${nodeUuid}/${filename}`;

    if (fs.existsSync(filePath)) {
      // return fs.readFileSync(filePath, { encoding: 'utf-8' });
      return new StreamableFile(fs.readFileSync(filePath));
    } else {
      throw new NotFoundException();
    }
  }
}
