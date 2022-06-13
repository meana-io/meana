import {Injectable} from '@nestjs/common';
import {UpdateNodeDiskDto} from './dto/update-node-disk.dto';
import {NodeDisk} from "./entities/node-disk.entity";
import {InjectModel} from "@nestjs/sequelize";
import {FindAllDto} from "../../common/findAll.dto";
import {CreateNodeDiskDto} from "./dto/create-node-disk.dto";

@Injectable()
export class NodeDisksService {
  constructor(@InjectModel(NodeDisk) private nodeDiskModel: typeof NodeDisk) {
  }
  async create(createNodeDiskDto: CreateNodeDiskDto) {
    return await this.nodeDiskModel.create({ ...createNodeDiskDto })
  }

  async findAll(findAllDto: FindAllDto) {
    return await this.nodeDiskModel.findAll({limit: 100,  ...findAllDto})
  }
  //
  // async findOne(uuid: string) {
  //   return await this.nodeDiskModel.findOne({ where: {
  //       serialNumber: uuid
  //     }})
  // }
  //
  // async update(uuid: string, updateNodeDiskDto: UpdateNodeDiskDto) {
  //   const node = await this.nodeDiskModel.findOne({ where: {
  //       serialNumber: uuid
  //     }})
  //
  //   await node.update({ ...updateNodeDiskDto })
  //   await node.save();
  //
  //   return node
  // }
  //
  // async deleteOne(uuid: string) {
  //   const node = await this.nodeDiskModel.findOne({ where: {
  //       serialNumber: uuid
  //     }})
  //   await node.destroy()
  //
  //   return node
  // }
}
