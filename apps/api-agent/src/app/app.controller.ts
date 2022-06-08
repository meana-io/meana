import {Body, Controller, Get, Post} from '@nestjs/common';

import { AppService } from './app.service';
import {CreateDto} from "./dto/create.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  create(@Body() createDto: CreateDto) {
    return createDto
  }
}
