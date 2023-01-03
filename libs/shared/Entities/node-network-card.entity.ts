import { InferAttributes } from 'sequelize';
import { Column, Model, Sequelize, Table } from 'sequelize-typescript';
import { NodePackage } from '../Types/NodePackage';
import { NodeNetworkCard } from '../Types/NodeNetworkCard';

@Table({
  tableName: 'node_network_cards',
  timestamps: false,
})
export class NodeNetworkCardEntity
  extends Model<InferAttributes<NodeNetworkCardEntity>>
  implements NodeNetworkCard
{
  @Column({
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    primaryKey: true,
  })
  time: string;

  @Column
  nodeUuid: string;

  @Column
  name: string;

  @Column
  macAddress: string;

  @Column
  ipv4: string;

  @Column
  ipv6: string;
}
