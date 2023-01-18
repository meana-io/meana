import { Column, Model, Table } from 'sequelize-typescript';
import { Settings } from '../Types/Settings';

@Table({
  tableName: 'settings',
})
export class SettingsEntity extends Model implements Settings {
  @Column
  uuid: number;

  @Column
  key: string;

  @Column
  value: string;

  @Column
  userUuid: string;
}
