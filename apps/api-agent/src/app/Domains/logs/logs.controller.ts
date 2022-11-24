import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { UploadDto } from './dto/upload.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any, @Body() uploadDto: UploadDto) {
    const filePath = `storage/${uploadDto.nodeUuid}/`;
    const filePathName = `${filePath}${uploadDto.filename}`;

    if (!fs.existsSync(`storage/${uploadDto.nodeUuid}`)) {
      fs.mkdirSync(`storage/${uploadDto.nodeUuid}`);
    }
    fs.writeFileSync(filePathName, file.buffer);
  }
}
