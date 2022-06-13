import {Column, Model, Table} from "sequelize-typescript";
import {InferAttributes} from "sequelize";
import { NodeRam as LocalNodeRam } from "../../../../../../../shared/Entities/NodeRam"
import {DateTime} from "luxon";

@Table({
    tableName: 'node_rams',
    timestamps: false
})
export class NodeRam extends Model<InferAttributes<NodeRam>> implements LocalNodeRam {
    @Column({
        defaultValue: DateTime.now().toISO(),
        primaryKey: true
    })
    time: string

    @Column
    nodeId: string;

    @Column({
        allowNull: true,
    })
    total?: string;

    @Column({
        allowNull: true,
    })
    used?: string;
}
