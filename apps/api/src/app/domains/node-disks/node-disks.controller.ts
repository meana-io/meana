import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NodeDisksService } from './node-disks.service';
import { CreateNodeDiskDto } from './dto/create-node-disk.dto';
import { UpdateNodeDiskDto } from './dto/update-node-disk.dto';

@Controller('node-disks')
export class NodeDisksController {
  constructor(private readonly nodeDisksService: NodeDisksService) {}

  @Post()
  create(@Body() createNodeDiskDto: CreateNodeDiskDto) {
    return this.nodeDisksService.create(createNodeDiskDto);
  }

  @Get()
  findAll() {
    return this.nodeDisksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nodeDisksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNodeDiskDto: UpdateNodeDiskDto
  ) {
    return this.nodeDisksService.update(+id, updateNodeDiskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodeDisksService.remove(+id);
  }
}
