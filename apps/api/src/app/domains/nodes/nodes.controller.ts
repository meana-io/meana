import {
  Controller,
  Get,
  Post,
  Body, Param, Patch, Delete,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import {UpdateNodeDto} from "./dto/update-node.dto";
import {FindAllDto} from "../../common/findAll.dto";

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  async create(@Body() createNodeDto: CreateNodeDto) {
    return await this.nodesService.create(createNodeDto);
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.nodesService.findAll(findAllDto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.nodesService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateNodeDto: UpdateNodeDto) {
    return this.nodesService.update(uuid, updateNodeDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.nodesService.deleteOne(uuid);
  }
}
