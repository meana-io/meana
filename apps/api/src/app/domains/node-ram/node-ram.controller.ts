import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NodeRamService } from './node-ram.service';
import { CreateNodeRamDto } from './dto/create-node-ram.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('node-ram')
export class NodeRamController {
  constructor(
    private readonly nodeRamService: NodeRamService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeRamDto: CreateNodeRamDto) {
    return await this.nodeRamService.create(createNodeRamDto);
  }

  @Get()
  findAll(
    @Query('fields')
    fields?: string,
    @Query('limit') limit?: number,
    @Query('sort') sort?: string[],
    @Query('search') search?: string
  ) {
    const findOptions = this.apiService.prepareGetManyOptions(
      fields,
      limit,
      sort,
      search
    );

    return this.nodeRamService.findAll(findOptions);
  }
}
