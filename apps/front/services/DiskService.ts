import api from '../utils/http';

class DiskService {
  getAllNodeDisks(nodeId: string): Promise<any> {
    return api.get(`/disks?nodeId=${nodeId}`);
  }
}

export default new DiskService();
