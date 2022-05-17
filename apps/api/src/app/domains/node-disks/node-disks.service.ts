import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateNodeDiskDto } from './dto/create-node-disk.dto';
import { UpdateNodeDiskDto } from './dto/update-node-disk.dto';
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository, wrap} from "@mikro-orm/core";
import {NodeDisk} from "./entities/node-disk.entity";

@Injectable()
export class NodeDisksService {
  constructor(@InjectRepository(NodeDisk) private readonly nodeDiskRepository: EntityRepository<NodeDisk>) {
  }
  async create(createNodeDiskDto: CreateNodeDiskDto) {
    const node = this.nodeDiskRepository.create(createNodeDiskDto)
    await this.nodeDiskRepository.persistAndFlush(node)

    return node;
  }

  async findAll() {
    return await this.nodeDiskRepository.findAll()
  }

  async findOne(id: string) {
    try {
      return await this.nodeDiskRepository.findOneOrFail({uuid: id});
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateNodeDiskDto: UpdateNodeDiskDto) {
    try {
      const nodeDisk = await this.nodeDiskRepository.findOneOrFail({uuid: id});
      const newEntity = wrap(nodeDisk).assign({ ...updateNodeDiskDto })
      await this.nodeDiskRepository.persistAndFlush(newEntity)

      return newEntity
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async remove(id: string) {
    try {
      const node = await this.nodeDiskRepository.findOneOrFail({uuid: id});
      await this.nodeDiskRepository.removeAndFlush(node)

      return node
    } catch (e) {
      throw new NotFoundException()
    }
  }
}
