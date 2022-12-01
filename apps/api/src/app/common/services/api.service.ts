import { Injectable } from '@nestjs/common';
import { Dialect, FindOptions } from 'sequelize';
import { SearchBuilder } from 'sequelize-search-builder';
import { Sequelize } from 'sequelize-typescript';
export interface Search {
  [key: string]: string;
}

@Injectable()
export class ApiService {
  public prepareGetManyOptions(
    request?: any,
    fields?: string,
    limit?: number,
    offset?: number,
    sort?: string[],
    search?: string
  ): FindOptions {
    const sequelize = new Sequelize({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    const searchBuilder = require('sequelize-search-builder');
    const queryBuilder = new searchBuilder(sequelize, request);

    return {
      attributes: fields ? fields.split(',') : null,
      limit: limit ? limit : 100,
      offset: offset ? offset : null,
      order: sort ? sort.map((x) => x.split('|')) : null,
      where: search ? JSON.parse(search) : queryBuilder.getWhereQuery(),
    } as FindOptions;
  }

  // public prepareGetManyOptions2(request: any) {
  //   console.log(request);
  //   const sequelize = new Sequelize({
  //     dialect: process.env.DB_DIALECT as Dialect,
  //     host: process.env.DB_HOST,
  //     port: +process.env.DB_PORT,
  //     username: process.env.DB_USERNAME,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_DATABASE,
  //   });
  //
  //   // const searchElo = new SearchBuilder(sequelize, request);
  //
  //   const searchBuilder = require('sequelize-search-builder');
  //
  //   const searchElo = new searchBuilder(sequelize, request);
  //   const whereQuery = searchElo.getWhereQuery();
  //
  //   console.log(whereQuery);
  //
  //   return {
  //     attributes: fields ? fields.split(',') : null,
  //     limit: limit ? limit : 100,
  //     offset: offset ? offset : null,
  //     order: sort ? sort.map((x) => x.split('|')) : null,
  //     where: search ? JSON.parse(search) : null,
  //   } as FindOptions;
  // }
}
