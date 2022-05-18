import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateNodeDiskPartitionDto } from './dto/create-node-disk-partition.dto';
import { UpdateNodeDiskPartitionDto } from './dto/update-node-disk-partition.dto';
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository, wrap} from "@mikro-orm/core";
import {NodeDiskPartition} from "./entities/node-disk-partition.entity";

@Injectable()
export class NodeDiskPartitionsService {
  constructor(@InjectRepository(NodeDiskPartition) private readonly nodeDiskPartitionRepository: EntityRepository<NodeDiskPartition>) {
  }
  async create(createNodeDiskPartitionDto: CreateNodeDiskPartitionDto) {
    const node = this.nodeDiskPartitionRepository.create(createNodeDiskPartitionDto)
    await this.nodeDiskPartitionRepository.persistAndFlush(node)

    return node;
  }

  async findAll() {
    return await this.nodeDiskPartitionRepository.findAll()
  }

  async findOne(id: string) {
    try {
      return await this.nodeDiskPartitionRepository.findOneOrFail({uuid: id});
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateNodeDiskPartitionDto: UpdateNodeDiskPartitionDto) {
    try {
      const nodeDisk = await this.nodeDiskPartitionRepository.findOneOrFail({uuid: id});
      const newEntity = wrap(nodeDisk).assign({ ...updateNodeDiskPartitionDto })
      await this.nodeDiskPartitionRepository.persistAndFlush(newEntity)

      return newEntity
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async remove(id: string) {
    try {
      const node = await this.nodeDiskPartitionRepository.findOneOrFail({uuid: id});
      await this.nodeDiskPartitionRepository.removeAndFlush(node)

      return node
    } catch (e) {
      throw new NotFoundException()
    }
  }
}
