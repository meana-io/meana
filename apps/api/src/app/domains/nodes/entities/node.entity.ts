import { Column, Model, Table } from 'sequelize-typescript';
import { v4 } from 'uuid';
import { Node as LocalNode } from "../../../../../../../shared/Entities/Node"

@Table({
    tableName: 'nodes'
})
export class Node extends Model implements LocalNode {
    @Column({ defaultValue: v4(), primaryKey: true})
    uuid: string;

    @Column
    name: string;
}
