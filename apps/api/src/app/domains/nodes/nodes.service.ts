import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateNodeDto} from './dto/create-node.dto';
import {UpdateNodeDto} from './dto/update-node.dto';
import {Node} from "./entities/node.entity";
import {EntityRepository, wrap} from "@mikro-orm/core";
import {InjectRepository} from "@mikro-orm/nestjs";

@Injectable()
export class NodesService {
  constructor(@InjectRepository(Node) private readonly nodeRepository: EntityRepository<Node>) {
  }
  async create(createNodeDto: CreateNodeDto) {
    const node = this.nodeRepository.create(createNodeDto)
    await this.nodeRepository.persistAndFlush(node)

    return node;
  }

  async findAll() {
    return await this.nodeRepository.findAll()
  }

  async findOne(id: string) {
    try {
      return await this.nodeRepository.findOneOrFail({uuid: id});
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateNodeDto: UpdateNodeDto) {
    try {
      const node = await this.nodeRepository.findOneOrFail({uuid: id});
      const newEntity = wrap(node).assign({ ...updateNodeDto })
      await this.nodeRepository.persistAndFlush(newEntity)

      return newEntity
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async remove(id: string) {
    try {
      const node = await this.nodeRepository.findOneOrFail({uuid: id});
      await this.nodeRepository.removeAndFlush(node)

      return node
    } catch (e) {
      throw new NotFoundException()
    }
  }
}
