import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NodeCpuService } from './node-cpu.service';
import { CreateNodeDiskDto } from '../node-disks/dto/create-node-disk.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('node-cpu')
export class NodeCpuController {
  constructor(
    private readonly nodeCpuService: NodeCpuService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeCpuDto: CreateNodeDiskDto) {
    return await this.nodeCpuService.create(createNodeCpuDto);
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
