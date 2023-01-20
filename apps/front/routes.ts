export const apiRoutes = {
  nodes: '/nodes',
  nodeCpu: '/node-cpu',
  nodeRam: '/node-ram',
  nodeDisks: '/node-disks',
  getLatestDisks: '/node-disks/get-latest-disks',
  nodeDiskPartitions: '/node-disk-partitions',
  dashboard: '/settings/dashboard',
  users: '/users',
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  nodeLogs: '/node-logs',
  nodeThresholds: '/node-thresholds',
  nodeUsers: '/node-users/get-latest',
  nodePackages: '/node-packages/get-latest',
  nodeReport: '/reports/generate',
  getLatestNetworkCard: '/node-network-cards',
  getLatestNodeDevices: '/node-devices',
  nodeHealth: '/nodes/health',
};

export const pageRoutes = {
  dashboard: '/dashboard',
  users: '/users/list',
  editUser: '/users',
  createUser: '/users/create',
  nodes: '/nodes',
  createNode: '/nodes/create',
  createReport: '/reports/create',
  login: '/login',
  register: '/register',
};
