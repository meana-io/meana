import {Column, Model, Table} from "sequelize-typescript";
import {DateTime} from "luxon";
import { NodeDisk as LocalNodeDisk } from "../../../../../../../shared/Entities/NodeDisk"

@Table({
    tableName: 'node_disks',
    timestamps: false
})
export class NodeDisk extends Model implements LocalNodeDisk {
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
}
