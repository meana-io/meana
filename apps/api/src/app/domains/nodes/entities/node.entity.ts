import {Column, Model, Table} from 'sequelize-typescript';
import {Node as LocalNode} from "../../../../../../../shared/Entities/Node"

@Table({
    tableName: 'nodes'
})

export class Node extends Model implements LocalNode {
    @Column
    uuid: string

    @Column
    name: string;
}
