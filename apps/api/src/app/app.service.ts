import { Injectable } from '@nestjs/common';
import {MikroORM} from "@mikro-orm/core";
import {EntityManager} from "@mikro-orm/postgresql";

@Injectable()
export class AppService {
  constructor(
      private readonly orm: MikroORM,
      private readonly em: EntityManager,
  ) {}

  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }
}
