import { Column, Model, Sequelize, Table } from 'sequelize-typescript';
import { InferAttributes } from 'sequelize';
import { NodeCpu } from '../Types/NodeCpu';

@Table({
  tableName: 'node_cpu',
  timestamps: false,
})
export class NodeCpuEntity
  extends Model<InferAttributes<NodeCpuEntity>>
  implements NodeCpu
{
  @Column({
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    primaryKey: true,
  })
  time: string;

  @Column
  nodeId: string;

  @Column({
    allowNull: true,
  })
  frequency?: string;

  @Column({
    allowNull: true,
  })
  coresQuantity?: string;

  @Column({
    allowNull: true,
  })
  manufacture?: string;

  @Column({
    allowNull: true,
  })
  model?: string;

  @Column({
    allowNull: true,
  })
  usage?: string;

  @Column({
    allowNull: true,
  })
  socketDesignation?: string;

  @Column({
    allowNull: true,
  })
  type?: string;

  @Column({
    allowNull: true,
  })
  cpuId?: string;

  @Column({
    allowNull: true,
  })
  version?: string;

  @Column({
    allowNull: true,
  })
  voltage?: string;

  @Column({
    allowNull: true,
  })
  externalClock?: string;

  @Column({
    allowNull: true,
  })
  maxSpeed?: string;

  @Column({
    allowNull: true,
  })
  status?: string;

  @Column({
    allowNull: true,
  })
  upgrade?: string;

  @Column({
    allowNull: true,
  })
  l1CacheHandle?: string;

  @Column({
    allowNull: true,
  })
  l2CacheHandle?: string;

  @Column({
    allowNull: true,
  })
  l3CacheHandle?: string;

  @Column({
    allowNull: true,
  })
  serialNumber?: string;

  @Column({
    allowNull: true,
  })
  assetTag?: string;

  @Column({
    allowNull: true,
  })
  partNumber?: string;

  @Column({
    allowNull: true,
  })
  coreEnabled?: string;

  @Column({
    allowNull: true,
  })
  threadCount?: string;

  @Column({
    allowNull: true,
  })
  characteristics?: string;
}
