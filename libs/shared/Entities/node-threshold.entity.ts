import { InferAttributes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'node_thresholds',
})
export class NodeThresholdEntity extends Model<
  InferAttributes<NodeThresholdEntity>
> {
  @Column
  uuid: string;

  @Column
  nodeUuid: string;

  @Column
  ramMin: number;

  @Column
  ramMax: number;

  @Column
  cpuMin: number;

  @Column
  cpuMax: number;
}
