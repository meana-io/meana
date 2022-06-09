import { Column, Model, Table } from 'sequelize-typescript';
import { v4 } from 'uuid';

@Table({
    tableName: 'nodes'
})
export class Node extends Model {
    @Column({ defaultValue: v4(), primaryKey: true})
    uuid: string;

    @Column
    name: string;
}
