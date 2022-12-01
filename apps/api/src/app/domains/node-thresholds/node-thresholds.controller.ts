import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiService } from '../../common/services/api.service';
import { NodeThresholdsService } from './node-thresholds.service';
import { CreateNodeThresholdDto } from './dto/create-node-threshold.dto';
import { UpdateNodeThresholdDto } from './dto/update-node-threshold.dto';

@Controller('node-thresholds')
export class NodeThresholdsController {
  constructor(
    private readonly nodeThresholdsService: NodeThresholdsService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeThresholdDto: CreateNodeThresholdDto) {
    return await this.nodeThresholdsService.create(createNodeThresholdDto);
  }

  @Get()
  findAll(
    @Query('fields')
    fields?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('sort') sort?: string[],
    @Query('search') search?: string
  ) {
    const findOptions = this.apiService.prepareGetManyOptions(
      fields,
      limit,
      offset,
      sort,
      search
    );

    return this.nodeThresholdsService.findAll(findOptions);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.nodeThresholdsService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateNodeThresholdDto: UpdateNodeThresholdDto
  ) {
    return this.nodeThresholdsService.update(uuid, updateNodeThresholdDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.nodeThresholdsService.deleteOne(uuid);
  }
}
