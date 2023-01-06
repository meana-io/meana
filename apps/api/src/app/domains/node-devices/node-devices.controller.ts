import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NodeDevicesService } from './node-devices.service';
import { ApiService } from '../../common/services/api.service';
import { CreateNodeDeviceDto } from './dto/create-node-device.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-devices')
export class NodeDevicesController {
  constructor(
    private readonly nodeDeviceService: NodeDevicesService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodeDeviceDto: CreateNodeDeviceDto) {
    return await this.nodeDeviceService.create(createNodeDeviceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query() requestQuery: any,
    @Query('fields')
    fields?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('sort') sort?: string[],
    @Query('search') search?: string
  ) {
    const findOptions = this.apiService.prepareGetManyOptions(
      requestQuery,
      fields,
      limit,
      offset,
      sort,
      search
    );

    return this.nodeDeviceService.findAll(findOptions);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid/get-latest')
  getLatest(@Param('uuid') nodeUuid: string) {
    return this.nodeDeviceService.getLatest(nodeUuid);
  }
}
