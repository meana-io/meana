import { Column, Model, Table } from 'sequelize-typescript';
import { ActiveDevices } from '../Types/ActiveDevices';

@Table({
  tableName: 'active_devices',
})
export class ActiveDevicesEntity extends Model implements ActiveDevices {
  @Column
  uuid: string;

  @Column
  nodeUuid: string;

  @Column
  disks: string;

  @Column
  packages: string;

  @Column
  users: string;

  @Column
  devices: string;

  @Column
  ramSticks: string;

  @Column
  networkCards: string;
}
