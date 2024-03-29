import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { NodeCpuService } from './node-cpu.service';
import { CreateNodeDiskDto } from '../node-disks/dto/create-node-disk.dto';
import { ApiService } from '../../common/services/api.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-cpu')
export class NodeCpuController {
  constructor(
    private readonly nodeCpuService: NodeCpuService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodeCpuDto: CreateNodeDiskDto) {
    return await this.nodeCpuService.create(createNodeCpuDto);
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

    return this.nodeCpuService.findAll(findOptions);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.nodeCpuService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNodeCpuDto: UpdateNodeCpuDto) {
  //   return this.nodeCpuService.update(+id, updateNodeCpuDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.nodeCpuService.remove(+id);
  // }
}
