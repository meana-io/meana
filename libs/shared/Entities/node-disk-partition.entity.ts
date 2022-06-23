import {Column, Model, Sequelize, Table} from "sequelize-typescript";
import {InferAttributes} from "sequelize";
import {NodeDiskPartition} from "../Types/NodeDiskPartition";

@Table({
    tableName: 'node_disk_partitions',
    timestamps: false
})
export class NodeDiskPartitionEntity extends Model<InferAttributes<NodeDiskPartitionEntity>> implements NodeDiskPartition {
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
