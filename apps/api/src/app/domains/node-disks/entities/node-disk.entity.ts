import {Column, Model, Table} from "sequelize-typescript";
import {DateTime} from "luxon";

@Table({
    tableName: 'node_disks',
    timestamps: false
})
export class NodeDisk extends Model {
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
