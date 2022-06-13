import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {NodeDisk as LocalNodeDisk} from "../../../../../../../shared/Entities/NodeDisk"
import {InferAttributes} from "sequelize";

@Table({
    tableName: 'node_disks',
    timestamps: false
})
export class NodeDisk extends Model<InferAttributes<NodeDisk>> implements LocalNodeDisk {
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
