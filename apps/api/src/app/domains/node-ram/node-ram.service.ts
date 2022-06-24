import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FindAllDto} from "../../common/findAll.dto";
import {CreateNodeRamDto} from "./dto/create-node-ram.dto";
import {NodeRamEntity} from "../../../../../../libs/shared/Entities/node-ram.entity";

@Injectable()
export class NodeRamService {
  constructor(@InjectModel(NodeRamEntity) private nodeRamModel: typeof NodeRamEntity) {
  }
  async create(createNodeRamDto: CreateNodeRamDto) {
    return await this.nodeRamModel.create({ ...createNodeRamDto })
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.nodeRamModel.findAll({order: ['time', 'DESC'], limit: 100,  ...findAllDto})
  }
}
