import {Body, Controller, Get, Post,} from '@nestjs/common';
import {NodeCpuService} from './node-cpu.service';
import {CreateNodeDiskDto} from "../node-disks/dto/create-node-disk.dto";
import {FindAllDto} from "../../common/findAll.dto";

@Controller('node-cpu')
export class NodeCpuController {
  constructor(private readonly nodeCpuService: NodeCpuService) {}

  @Post()
  async create(@Body() createNodeCpuDto: CreateNodeDiskDto) {
    return await this.nodeCpuService.create(createNodeCpuDto);
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.nodeCpuService.findAll(findAllDto);
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
