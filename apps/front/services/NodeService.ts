import api from '../utils/http';

class NodeService {
  getAll(): Promise<any> {
    return api.get('/nodes');
  }
}

export default new NodeService();
