import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { NodeRamService } from './node-ram.service';
import { CreateNodeRamDto } from './dto/create-node-ram.dto';
import { ApiService } from '../../common/services/api.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-ram')
export class NodeRamController {
  constructor(
    private readonly nodeRamService: NodeRamService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodeRamDto: CreateNodeRamDto) {
    return await this.nodeRamService.create(createNodeRamDto);
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

    return this.nodeRamService.findAll(findOptions);
  }
}
