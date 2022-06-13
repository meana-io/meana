import {Body, Controller, Get, Post,} from '@nestjs/common';
import {NodeRamService} from './node-ram.service';
import {FindAllDto} from "../../common/findAll.dto";
import {CreateNodeRamDto} from "./dto/create-node-ram.dto";

@Controller('node-ram')
export class NodeRamController {
  constructor(private readonly nodeRamService: NodeRamService) {}

  @Post()
  async create(@Body() createNodeRamDto: CreateNodeRamDto) {
    return await this.nodeRamService.create(createNodeRamDto);
  }

  @Get()
  findAll(@Body() findAllDto: FindAllDto) {
    return this.nodeRamService.findAll(findAllDto);
  }
}
