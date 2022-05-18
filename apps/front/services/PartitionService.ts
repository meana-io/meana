import api from '../utils/http';

class Partition {
  get(diskId: string): Promise<any> {
    return api.get(`/nodeDiskPartitions/${diskId}`);
  }
}

export default new Partition();
