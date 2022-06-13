import {Body, Controller, Post,} from '@nestjs/common';
import {GlobalService} from './global.service';
import {CreateGlobalDto} from './dto/create-global.dto';

@Controller('global')
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Post()
  create(@Body() createGlobalDto: CreateGlobalDto) {
    return this.globalService.insert(createGlobalDto);
  }
}
