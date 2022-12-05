import { Column, Model, Table } from 'sequelize-typescript';
import { User } from '../Types/User';

@Table({
  tableName: 'users',
})
export class UserEntity extends Model implements User {
  @Column
  uuid: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  login: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  email_notification: boolean;

  @Column
  last_notification_at: string;
}
