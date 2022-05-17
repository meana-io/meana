import { Injectable } from '@nestjs/common';
import { CreateNodeDiskDto } from './dto/create-node-disk.dto';
import { UpdateNodeDiskDto } from './dto/update-node-disk.dto';

@Injectable()
export class NodeDisksService {
  create(createNodeDiskDto: CreateNodeDiskDto) {
    return 'This action adds a new nodeDisk';
  }

  findAll() {
    return `This action returns all nodeDisks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nodeDisk`;
  }

  update(id: number, updateNodeDiskDto: UpdateNodeDiskDto) {
    return `This action updates a #${id} nodeDisk`;
  }

  remove(id: number) {
    return `This action removes a #${id} nodeDisk`;
  }
}
