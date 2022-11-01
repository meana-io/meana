import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('nodes')
export class NodesController {
  constructor(
    private readonly nodesService: NodesService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeDto: CreateNodeDto) {
    return await this.nodesService.create(createNodeDto);
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

    return this.nodesService.findAll(findOptions);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.nodesService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateNodeDto: UpdateNodeDto) {
    return this.nodesService.update(uuid, updateNodeDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.nodesService.deleteOne(uuid);
  }
}
