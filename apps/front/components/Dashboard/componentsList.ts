import CpuCustomCard, { COMPONENT_NAME as CUP_NAME } from './Cpu/CpuCustomCard';
import RamCustomCard, { COMPONENT_NAME as RAM_NAME } from './Ram/RamCustomCard';
import DiskCustomCard, {
  COMPONENT_NAME as DISK_NAME,
} from './Disk/DiskCustomCard';
import PartitionCustomCard, {
  COMPONENT_NAME as PARTITION_NAME,
} from './Partition/PartitionCustomCard';

export const DASHBOARD_COMPONENTS = {
  [CUP_NAME]: CpuCustomCard,
  [RAM_NAME]: RamCustomCard,
  [DISK_NAME]: DiskCustomCard,
  [PARTITION_NAME]: PartitionCustomCard,
};
