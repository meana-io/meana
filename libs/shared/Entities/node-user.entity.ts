import { NodeUser } from '../Types/NodeUser';
import { DataTypes, InferAttributes } from 'sequelize';
import { Column, Model, Sequelize, Table } from 'sequelize-typescript';

@Table({
  tableName: 'node_users',
  timestamps: false,
})
export class NodeUserEntity
  extends Model<InferAttributes<NodeUserEntity>>
  implements NodeUser
{
  @Column({
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    primaryKey: true,
  })
  time: string;

  @Column
  nodeUuid: string;

  @Column
  username: string;

  @Column(DataTypes.ARRAY(DataTypes.STRING))
  groups: string[];
}
