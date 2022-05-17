import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import { v4 } from 'uuid';

@Entity()
export class Node {
    @PrimaryKey()
    uuid: string = v4();

    @Property({ nullable: false})
    name: string;

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
