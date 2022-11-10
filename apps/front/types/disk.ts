import Partition from './partition';

export default interface Disk {
  name: string;
  path: string;
  model: string;
  capacity: string;
  partitions: null | Partition[];
  manufacture: string;
  serialNumber: string;
}
