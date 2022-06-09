import {Column, Model, Table} from "sequelize-typescript";
import {DateTime} from "luxon";
import { NodeDiskPartition as LocalNodeDiskPartition } from "../../../../../../../shared/Entities/NodeDiskPartition"

@Table({
    tableName: 'node_disk_partitions',
    timestamps: false
})
export class NodeDiskPartition extends Model implements LocalNodeDiskPartition {
    @Column({
        defaultValue: DateTime.now().toISO(),
        primaryKey: true
    })
    time: string

    @Column
    nodeDiskId: string;

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
