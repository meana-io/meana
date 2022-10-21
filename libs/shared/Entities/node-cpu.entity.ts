import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {InferAttributes} from "sequelize";
import {NodeCpu} from "../Types/NodeCpu";

@Table({
    tableName: 'node_cpu',
    timestamps: false
})
export class NodeCpuEntity extends Model<InferAttributes<NodeCpuEntity>> implements NodeCpu {
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
    frequency?: string;

    @Column({
        allowNull: true,
    })
    coresQuantity?: string;

    @Column({
        allowNull: true,
    })
    manufacture?: string;

    @Column({
        allowNull: true,
    })
    model?: string;

    @Column({
        allowNull: true,
    })
    usage?: string;
}
