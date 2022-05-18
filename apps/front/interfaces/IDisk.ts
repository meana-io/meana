interface IDisk {
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

export default IDisk;
