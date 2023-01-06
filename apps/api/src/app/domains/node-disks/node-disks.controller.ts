import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { NodeDisksService } from './node-disks.service';
import { CreateNodeDiskDto } from './dto/create-node-disk.dto';
import { ApiService } from '../../common/services/api.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('node-disks')
export class NodeDisksController {
  constructor(
    private readonly nodeDisksService: NodeDisksService,
    private readonly apiService: ApiService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-latest-disks')
  getLatestDisks(@Query('nodeUuid') nodeUuid: string) {
    return this.nodeDisksService.getLatestDisks(nodeUuid);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeDisksService.create(createNodeDiskDto);
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
