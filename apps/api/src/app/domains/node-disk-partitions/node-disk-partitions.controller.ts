import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NodeDiskPartitionsService } from './node-disk-partitions.service';
import { CreateNodeDiskPartitionDto } from './dto/create-node-disk-partition.dto';
import { ApiService } from '../../common/services/api.service';

@Controller('node-disk-partitions')
export class NodeDiskPartitionsController {
  constructor(
    private readonly nodeDiskPartitionsService: NodeDiskPartitionsService,
    private readonly apiService: ApiService
  ) {}

  @Post()
  async create(@Body() createNodeDiskPartitionDto: CreateNodeDiskPartitionDto) {
    return await this.nodeDiskPartitionsService.create(
      createNodeDiskPartitionDto
    );
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

    return this.nodeDiskPartitionsService.findAll(findOptions);
  }

  // @Get(':uuid')
  // findOne(@Param('uuid') uuid: string) {
  //   return this.nodeDiskPartitionsService.findOne(uuid);
  // }
  //
  // @Patch(':uuid')
  // update(@Param('uuid') uuid: string, @Body() updateNodeDiskPartitionDto: UpdateNodeDiskPartitionDto) {
  //   return this.nodeDiskPartitionsService.update(uuid, updateNodeDiskPartitionDto);
  // }
  //
  // @Delete(':uuid')
  // remove(@Param('uuid') nodeDiskId: string) {
  //   return this.nodeDiskPartitionsService.deleteOne(uuid);
  // }
}
