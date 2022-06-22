import { Injectable } from '@nestjs/common';
import { CreateNodeCpuDto } from './dto/create-node-cpu.dto';
import { UpdateNodeCpuDto } from './dto/update-node-cpu.dto';

@Injectable()
export class NodeCpuService {
  create(createNodeCpuDto: CreateNodeCpuDto) {
    return 'This action adds a new nodeCpu';
  }

  findAll() {
    return `This action returns all nodeCpu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nodeCpu`;
  }

  update(id: number, updateNodeCpuDto: UpdateNodeCpuDto) {
    return `This action updates a #${id} nodeCpu`;
  }

  remove(id: number) {
    return `This action removes a #${id} nodeCpu`;
  }
}
