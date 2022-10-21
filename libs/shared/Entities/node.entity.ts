import {Column, Model, Table} from "sequelize-typescript";
import {Node} from "../Types/Node"

@Table({
    tableName: 'nodes'
})
export class NodeEntity extends Model implements Node {
    @Column
    uuid: string

    @Column
    name: string;
}


