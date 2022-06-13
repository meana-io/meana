import {Body, Controller, Get, Post,} from '@nestjs/common';
import {FindAllDto} from "../../common/findAll.dto";
import {NodeDiskPartitionsService} from "./node-disk-partitions.service";
import {CreateNodeDiskPartitionDto} from "./dto/create-node-disk-partition.dto";

@Controller('node-disk-partitions')
export class NodeDiskPartitionsController {
  constructor(private readonly nodeDiskPartitionsService: NodeDiskPartitionsService) {}

  @Post()
  async create(@Body() createNodeDiskPartitionDto: CreateNodeDiskPartitionDto) {
    return await this.nodeDiskPartitionsService.create(createNodeDiskPartitionDto);
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.nodeDiskPartitionsService.findAll(findAllDto);
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
