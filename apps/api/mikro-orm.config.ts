import {NodeDisk} from "./src/app/domains/node-disks/entities/node-disk.entity";
import {Node} from "./src/app/domains/nodes/entities/node.entity";
import {NodeDiskPartition} from "./src/app/domains/node-disk-partitions/entities/node-disk-partition.entity";

export default {
    entities: [Node, NodeDisk, NodeDiskPartition],
    dbName: 'meana',
    user: 'postgres',
    password: '',
    port: 5432,
    host: 'localhost',
    type: 'postgresql'
};
