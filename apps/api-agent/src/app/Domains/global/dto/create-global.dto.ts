import { NodeRam } from '../../../../../../../libs/shared/Types/NodeRam';
import { NodeCpu } from '../../../../../../../libs/shared/Types/NodeCpu';
import { NodeUser } from '../../../../../../../libs/shared/Types/NodeUser';
import { NodeDisk } from '../../../../../../../libs/shared/Types/NodeDisk';
import { NodeDiskPartition } from '../../../../../../../libs/shared/Types/NodeDiskPartition';
import { NodePackage } from '../../../../../../../libs/shared/Types/NodePackage';
import { NodeRamStick } from '../../../../../../../libs/shared/Types/NodeRamStick';

export interface Disk extends NodeDisk {
  partitions: NodeDiskPartition[];
  name: string;
}

type NestedUsers = {
  users: NodeUser[];
};

type NestedPackages = {
  packages: NodePackage[];
};

type Device = {
  name: string;
  port: string;
};

type RamStick = {
  rams: NodeRamStick[];
};

export class CreateGlobalDto {
  nodeUuid: string;
  disks: Disk[];
  ram: NodeRam & RamStick;
  cpu: NodeCpu;
  users: NestedUsers;
  packages?: NestedPackages;
  devices?: Device[];
}
