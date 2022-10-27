import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NodeDisksService } from './node-disks.service';
import { CreateNodeDiskDto } from './dto/create-node-disk.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('node-disks')
export class NodeDisksController {
  constructor(
    private readonly nodeDisksService: NodeDisksService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeDisksService.create(createNodeDiskDto);
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

    return this.nodeDisksService.findAll(findOptions);
  }

  // @Get(':uuid')
  // findOne(@Param('uuid') uuid: string) {
  //   return this.nodeDisksService.findOne(uuid);
  // }
  //
  // @Patch(':uuid')
  // update(@Param('uuid') uuid: string, @Body() updateNodeDiskDto: UpdateNodeDiskDto) {
  //   return this.nodeDisksService.update(uuid, updateNodeDiskDto);
  // }
  //
  // @Delete(':uuid')
  // remove(@Param('uuid') uuid: string) {
  //   return this.nodeDisksService.deleteOne(uuid);
  // }
}
