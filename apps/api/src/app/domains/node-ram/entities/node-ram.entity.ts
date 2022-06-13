import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {InferAttributes} from "sequelize";
import {NodeRam as LocalNodeRam} from "../../../../../../../shared/Entities/NodeRam"

@Table({
    tableName: 'node_rams',
    timestamps: false
})
export class NodeRam extends Model<InferAttributes<NodeRam>> implements LocalNodeRam {
    @Column({
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
