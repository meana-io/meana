import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateNodeDiskDto} from "../node-disks/dto/create-node-disk.dto";
import {FindAllDto} from "../../common/findAll.dto";
import {NodeRam} from "./entities/node-ram.entity";

@Injectable()
export class NodeRamService {
  constructor(@InjectModel(NodeRam) private nodeRamModel: typeof NodeRam) {
  }
  async create(createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeRamModel.create({ ...createNodeDiskDto })
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.nodeRamModel.findAll(findAllDto)
  }
}
