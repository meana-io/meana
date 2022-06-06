export default interface Disk {
  id: string;
  nodeId: string;
  path: string;
  manufacture: string;
  model: string;
  serialNumber: string;
  capacity: number;
  firmwareVersion: string;
  created_at: string;
  updated_at: string;
}
