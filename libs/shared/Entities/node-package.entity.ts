import { InferAttributes } from 'sequelize';
import { Column, Model, Sequelize, Table } from 'sequelize-typescript';
import { NodePackage } from '../Types/NodePackage';

@Table({
  tableName: 'node_packages',
  timestamps: false,
})
export class NodePackageEntity
  extends Model<InferAttributes<NodePackageEntity>>
  implements NodePackage
{
  @Column({
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    primaryKey: true,
  })
  time: string;

  @Column
  nodeUuid: string;

  @Column
  packageName: string;

  @Column
  packageVersion: string;
}
