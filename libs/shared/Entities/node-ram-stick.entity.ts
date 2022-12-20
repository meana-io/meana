import { Column, Model, Sequelize, Table } from 'sequelize-typescript';
import { InferAttributes } from 'sequelize';
import { NodeRamStick } from '../Types/NodeRamStick';

@Table({
  tableName: 'node_ram_sticks',
  timestamps: false,
})
export class NodeRamStickEntity
  extends Model<InferAttributes<NodeRamStickEntity>>
  implements NodeRamStick
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
  arrayHandle?: string;

  @Column({
    allowNull: true,
  })
  errorInformationHandle?: string;

  @Column({
    allowNull: true,
  })
  totalWidth?: string;

  @Column({
    allowNull: true,
  })
  dataWidth?: string;

  @Column({
    allowNull: true,
  })
  size?: string;

  @Column({
    allowNull: true,
  })
  formFactor?: string;

  @Column({
    allowNull: true,
  })
  ramSet?: string;

  @Column({
    allowNull: true,
  })
  locator?: string;

  @Column({
    allowNull: true,
  })
  bankLocator?: string;

  @Column({
    allowNull: true,
  })
  type?: string;

  @Column({
    allowNull: true,
  })
  typeDetail?: string;

  @Column({
    allowNull: true,
  })
  speed?: string;

  @Column({
    allowNull: true,
  })
  manufacturer?: string;

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
  rank?: string;

  @Column({
    allowNull: true,
  })
  configuredMemorySpeed?: string;

  @Column({
    allowNull: true,
  })
  minimumVoltage?: string;

  @Column({
    allowNull: true,
  })
  maximumVoltage?: string;

  @Column({
    allowNull: true,
  })
  configuredVoltage?: string;
}
