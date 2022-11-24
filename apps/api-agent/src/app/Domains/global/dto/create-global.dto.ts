import { NodeRam } from '../../../../../../../libs/shared/Types/NodeRam';
import { NodeCpu } from '../../../../../../../libs/shared/Types/NodeCpu';
import { NodeUser } from '../../../../../../../libs/shared/Types/NodeUser';
import { NodeDisk } from '../../../../../../../libs/shared/Types/NodeDisk';
import { NodeDiskPartition } from '../../../../../../../libs/shared/Types/NodeDiskPartition';

export interface Disk extends NodeDisk {
  partitions: NodeDiskPartition[];
  name: string;
}

type NestedUsers = {
  users: NodeUser[];
};

export class CreateGlobalDto {
  nodeUuid: string;
  disks: Disk[];
  ram: NodeRam;
  cpu: NodeCpu;
  users: NestedUsers;
}
