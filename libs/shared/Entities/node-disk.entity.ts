import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {InferAttributes} from "sequelize";
import {NodeDisk} from "../Types/NodeDisk";

@Table({
    tableName: 'node_disks',
    timestamps: false
})
export class NodeDiskEntity extends Model<InferAttributes<NodeDiskEntity>> implements NodeDisk {
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
    path?: string;

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
    serialNumber?: string;

    @Column({
        allowNull: true,
    })
    capacity?: string;

    @Column({
        allowNull: true,
    })
    firmwareVersion?: string;

    @Column({
        allowNull: true,
    })
    name?: string;
}
