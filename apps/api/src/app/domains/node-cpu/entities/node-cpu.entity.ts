import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {InferAttributes} from "sequelize";

@Table({
    tableName: 'node_cpu',
    timestamps: false
})
export class NodeCpu extends Model<InferAttributes<NodeCpu>> {
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
}
