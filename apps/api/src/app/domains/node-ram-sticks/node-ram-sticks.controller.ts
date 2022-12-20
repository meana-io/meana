import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NodeRamSticksService } from './node-ram-sticks.service';
import { CreateNodeRamStickDto } from './dto/create-node-ram-stick.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('node-ram-sticks')
export class NodeRamSticksController {
  constructor(
    private readonly nodeRamSticksService: NodeRamSticksService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeRamStickDto: CreateNodeRamStickDto) {
    return await this.nodeRamSticksService.create(createNodeRamStickDto);
  }

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

    return this.nodeRamSticksService.findAll(findOptions);
  }
}
