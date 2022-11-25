import CpuCustomCard, { COMPONENT_NAME as CUP_NAME } from './Cpu/CpuCustomCard';
import RamUsageGraph, {
  COMPONENT_NAME as RAM_GRAPH_NAME,
} from './Ram/RamUsageGraph';
import RamCustomCard, { COMPONENT_NAME as RAM_NAME } from './Ram/RamCustomCard';
import CpuUsageGraph, {
  COMPONENT_NAME as CUP_GRAPH_NAME,
} from './Cpu/CpuUsageGraph';
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
  [CUP_GRAPH_NAME]: CpuUsageGraph,
  [RAM_GRAPH_NAME]: RamUsageGraph,
};
