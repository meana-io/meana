import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import { v4 } from 'uuid';

@Entity()
export class NodeDiskPartition {
    @PrimaryKey()
    uuid: string = v4();

    @Property({ nullable: true })
    nodeDisk: string;

    @Property({ nullable: true })
    path?: string;

    @Property({ nullable: true })
    usedSpace?: string;

    @Property({ nullable: true })
    capacity?: string;

    @Property({ nullable: true })
    fileSystem?: string;

    @Property({ nullable: true })
    name?: string;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
