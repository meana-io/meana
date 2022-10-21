import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {InferAttributes} from "sequelize";
import {NodeRam} from "../Types/NodeRam";

@Table({
    tableName: 'node_rams',
    timestamps: false
})
export class NodeRamEntity extends Model<InferAttributes<NodeRamEntity>> implements NodeRam {
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
