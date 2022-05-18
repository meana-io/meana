import api from '../utils/http';

class DiskService {
  getAllNodeDisks(nodeId: string): Promise<any> {
    return api.get(`/nodeDisks/${nodeId}`);
  }
}

export default new DiskService();
