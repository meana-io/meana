import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NodeDiskPartitionsService } from './node-disk-partitions.service';
import { CreateNodeDiskPartitionDto } from './dto/create-node-disk-partition.dto';
import { UpdateNodeDiskPartitionDto } from './dto/update-node-disk-partition.dto';

@Controller('node-disk-partitions')
export class NodeDiskPartitionsController {
  constructor(
    private readonly nodeDiskPartitionsService: NodeDiskPartitionsService
  ) {}

  @Post()
  create(@Body() createNodeDiskPartitionDto: CreateNodeDiskPartitionDto) {
    return this.nodeDiskPartitionsService.create(createNodeDiskPartitionDto);
  }

  @Get()
  findAll() {
    return this.nodeDiskPartitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nodeDiskPartitionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNodeDiskPartitionDto: UpdateNodeDiskPartitionDto
  ) {
    return this.nodeDiskPartitionsService.update(
      id,
      updateNodeDiskPartitionDto
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodeDiskPartitionsService.remove(id);
  }
}
