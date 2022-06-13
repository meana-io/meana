import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FindAllDto} from "../../common/findAll.dto";
import {NodeRam} from "./entities/node-ram.entity";
import {CreateNodeRamDto} from "./dto/create-node-ram.dto";

@Injectable()
export class NodeRamService {
  constructor(@InjectModel(NodeRam) private nodeRamModel: typeof NodeRam) {
  }
  async create(createNodeRamDto: CreateNodeRamDto) {
    return await this.nodeRamModel.create({ ...createNodeRamDto })
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.nodeRamModel.findAll({limit: 100,  ...findAllDto})
  }
}
