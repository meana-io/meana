import { Injectable } from '@nestjs/common';
import { ReportRequestDto } from './dto/report-request.dto';
import { Sequelize } from 'sequelize-typescript';
import { Dialect, QueryTypes } from 'sequelize';
import { Property } from '../../../../../../libs/shared/Types/NodeProperty';

export type AggregationType = 'min' | 'max' | 'avg';

@Injectable()
export class ReportsService {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  async generate(reportRequestDto: ReportRequestDto) {
    const queries = reportRequestDto.properties.map((property) => {
      if (property.diskIdentifier) {
        const path = property.diskIdentifier.split('.');
        return {
          property,
          query: ReportsService.getPartitionQuery(
            path[0],
            path[1],
            property.property,
            reportRequestDto.aggregatePeriod,
            reportRequestDto.from,
            reportRequestDto.to
          ),
        };
      }
      return {
        property,
        query: ReportsService.getQuery(
          property.nodeUuid,
          property.property,
          reportRequestDto.aggregatePeriod,
          reportRequestDto.from,
          reportRequestDto.to
        ),
      };
    });

    const result = [];

    for (const query of queries) {
      const dbResult = await this.sequelize.query(query.query, {
        type: QueryTypes.SELECT,
      });
      result.push({ ...query.property, result: dbResult });
    }

    return result;
  }

  private static getQuery(
    nodeUuid: string,
    property: Property,
    aggregationPeriod: number,
    from: string,
    to: string
  ): string {
    return `SELECT time_bucket(make_interval(secs := ${aggregationPeriod}), "${property.domain}"."time") AS AGGREGATION_PERIOD, ${property.aggregationType}("${property.domain}"."${property.propertyName}"::decimal) FROM "${property.domain}" WHERE "${property.domain}"."time" >= '${from}'::TIMESTAMP WITH TIME ZONE AND "${property.domain}"."time" <= '${to}'::TIMESTAMP WITH TIME ZONE AND "${property.domain}"."nodeId" = '${nodeUuid}' GROUP BY AGGREGATION_PERIOD`;
  }

  private static getPartitionQuery(
    path: string,
    diskIdentifier: string,
    property: Property,
    aggregationPeriod: number,
    from: string,
    to: string
  ): string {
    return `SELECT time_bucket(make_interval(secs := ${aggregationPeriod}), "${property.domain}"."time") AS AGGREGATION_PERIOD, ${property.aggregationType}("${property.domain}"."${property.propertyName}"::decimal) FROM "${property.domain}" WHERE "${property.domain}"."time" >= '${from}'::TIMESTAMP WITH TIME ZONE AND "${property.domain}"."time" <= '${to}'::TIMESTAMP WITH TIME ZONE AND "${property.domain}"."diskIdentifier" = '${diskIdentifier}' AND "${property.domain}"."path" = '${path}' GROUP BY AGGREGATION_PERIOD`;
  }
}
