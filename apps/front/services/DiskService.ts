import api from '../utils/http';

class DiskService {
  getAll(): Promise<any> {
    return api.get('/disks');
  }
}

export default new DiskService();
