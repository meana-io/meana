import { Column, Model, Sequelize, Table } from 'sequelize-typescript';
import { InferAttributes } from 'sequelize';
import { NodeDevice } from '../Types/NodeDevice';

@Table({
  tableName: 'node_devices',
  timestamps: false,
})
export class NodeDeviceEntity
  extends Model<InferAttributes<NodeDeviceEntity>>
  implements NodeDevice
{
  @Column({
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    primaryKey: true,
  })
  time: string;

  @Column
  nodeUuid: string;

  @Column({
    allowNull: true,
  })
  name?: string;

  @Column({
    allowNull: true,
  })
  port?: string;
}
