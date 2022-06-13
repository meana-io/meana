import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NodeCpuService } from './node-cpu.service';
import { CreateNodeCpuDto } from './dto/create-node-cpu.dto';
import { UpdateNodeCpuDto } from './dto/update-node-cpu.dto';

@Controller('node-cpu')
export class NodeCpuController {
  constructor(private readonly nodeCpuService: NodeCpuService) {}

  @Post()
  create(@Body() createNodeCpuDto: CreateNodeCpuDto) {
    return this.nodeCpuService.create(createNodeCpuDto);
  }

  @Get()
  findAll() {
    return this.nodeCpuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nodeCpuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNodeCpuDto: UpdateNodeCpuDto) {
    return this.nodeCpuService.update(+id, updateNodeCpuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodeCpuService.remove(+id);
  }
}
