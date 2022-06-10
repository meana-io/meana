import {NodeDisk} from "../../../../../../../shared/Entities/NodeDisk";
import {NodeDiskPartition} from "../../../../../../../shared/Entities/NodeDiskPartition";

export interface Disk extends NodeDisk {
    partitions: NodeDiskPartition[]
}

export class CreateGlobalDto {
    name: string
    disks: Disk[]
}
