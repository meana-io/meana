import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {NodeDiskPartition as LocalNodeDiskPartition} from "../../../../../../../shared/Entities/NodeDiskPartition"
import {InferAttributes} from "sequelize";

@Table({
    tableName: 'node_disk_partitions',
    timestamps: false
})
export class NodeDiskPartition extends Model<InferAttributes<NodeDiskPartition>> implements LocalNodeDiskPartition {
    @Column({
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        primaryKey: true
    })
    time: string

    @Column
    diskIdentifier: string;

    @Column({
        allowNull: true,
    })
    path?: string;

    @Column({
        allowNull: true,
    })
    usedSpace?: string;

    @Column({
        allowNull: true,
    })
    capacity?: string;

    @Column({
        allowNull: true,
    })
    fileSystem?: string;

    @Column({
        allowNull: true,
    })
    name?: string;
}
