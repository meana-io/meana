import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {NodeDisksService} from './node-disks.service';
import {CreateNodeDiskDto} from './dto/create-node-disk.dto';
import {UpdateNodeDiskDto} from './dto/update-node-disk.dto';
import {FindAllDto} from "../../common/findAll.dto";

@Controller('node-disks')
export class NodeDisksController {
  constructor(private readonly nodeDisksService: NodeDisksService) {}

  @Post()
  async create(@Body() createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeDisksService.create(createNodeDiskDto);
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.nodeDisksService.findAll(findAllDto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.nodeDisksService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateNodeDiskDto: UpdateNodeDiskDto) {
    return this.nodeDisksService.update(uuid, updateNodeDiskDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.nodeDisksService.deleteOne(uuid);
  }
}
