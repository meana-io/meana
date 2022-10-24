import {NodeDisk} from "../../../../../../../shared/Entities/NodeDisk";
import {NodeDiskPartition} from "../../../../../../../shared/Entities/NodeDiskPartition";
import {NodeRam} from "../../../../../../../shared/Entities/NodeRam";
import {Cpu} from "../../../../../../../shared/Entities/Cpu";

export interface Disk extends NodeDisk {
    partitions: NodeDiskPartition[]
}

export class CreateGlobalDto {
    nodeUuid: string
    disks: Disk[]
    ram: NodeRam
    cpu: Cpu
}
