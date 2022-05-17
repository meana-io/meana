import {NodeDisk} from "./src/app/domains/node-disks/entities/node-disk.entity";
import {Node} from "./src/app/domains/nodes/entities/node.entity";

export default {
    entities: [Node, NodeDisk],
    dbName: 'meana',
    user: 'postgres',
    password: '',
    port: 5432,
    host: 'localhost',
    type: 'postgresql'
};
