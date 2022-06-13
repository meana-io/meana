import {NodeDisk} from "../../../../../../../shared/Entities/NodeDisk";
import {NodeDiskPartition} from "../../../../../../../shared/Entities/NodeDiskPartition";
import {NodeRam} from "../../../../../../../shared/Entities/NodeRam";

export interface Disk extends NodeDisk {
    partitions: NodeDiskPartition[]
}

export class CreateGlobalDto {
    name: string
    disks: Disk[]
    ram: NodeRam
}
