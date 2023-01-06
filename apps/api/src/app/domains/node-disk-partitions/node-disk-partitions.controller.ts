import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { NodeDiskPartitionsService } from './node-disk-partitions.service';
import { CreateNodeDiskPartitionDto } from './dto/create-node-disk-partition.dto';
import { ApiService } from '../../common/services/api.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-disk-partitions')
export class NodeDiskPartitionsController {
  constructor(
    private readonly nodeDiskPartitionsService: NodeDiskPartitionsService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodeDiskPartitionDto: CreateNodeDiskPartitionDto) {
    return await this.nodeDiskPartitionsService.create(
      createNodeDiskPartitionDto
    );
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
