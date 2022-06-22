import {Injectable} from '@nestjs/common';
import {CreateNodeDiskDto} from "../node-disks/dto/create-node-disk.dto";
import {FindAllDto} from "../../common/findAll.dto";
import {InjectModel} from "@nestjs/sequelize";
import {NodeCpu} from "./entities/node-cpu.entity";

@Injectable()
export class NodeCpuService {
  constructor(@InjectModel(NodeCpu) private nodeCpuModel: typeof NodeCpu) {
  }

  async create(createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeCpuModel.create({ ...createNodeDiskDto })
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.nodeCpuModel.findAll({limit: 100,  ...findAllDto})
  }
}
