import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Cat} from "./dto/node.entity";

@Injectable()
export class AppService {
  constructor(@InjectModel(Cat) private catModel: typeof Cat) {
  }

  async getData(): Promise<Cat[]> {
    return this.catModel.findAll();
  }
}
