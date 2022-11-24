import {
  Controller,
  Get,
  NotFoundException,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import * as fs from 'fs';

@Controller('node-logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

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
