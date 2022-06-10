import {Injectable} from '@nestjs/common';
import {Node} from "./entities/node.entity";
import {InjectModel} from "@nestjs/sequelize";
import {CreateNodeDto} from "./dto/create-node.dto";
import {UpdateNodeDto} from "./dto/update-node.dto";
import {FindAllDto} from "../../common/findAll.dto";

@Injectable()
export class NodesService {
  constructor(@InjectModel(Node) private nodeModel: typeof Node) {
  }
  async create(createNodeDto: CreateNodeDto) {
    this.nodeModel.removeAttribute('id')

    return await this.nodeModel.create({ ...createNodeDto })
  }

  async findAll(findAllDto: FindAllDto) {
    this.nodeModel.removeAttribute('id')

    return await this.nodeModel.findAll(findAllDto)
  }

  async findOne(uuid: string) {
    this.nodeModel.removeAttribute('id')

    return await this.nodeModel.findOne({ where: {
        uuid
        }})
  }

  async update(uuid: string, updateNodeDto: UpdateNodeDto) {
    const node = await this.nodeModel.findOne({ where: {
      uuid
      }})

    await node.update({ ...updateNodeDto })
    await node.save();

    return node
  }

  async deleteOne(uuid: string) {
    const node = await this.nodeModel.findOne({ where: {
      uuid
      }})
    await node.destroy()

    return node
  }
}
