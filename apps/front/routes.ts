export const apiRoutes = {
  nodes: '/nodes',
  nodeCpu: '/node-cpu',
  nodeRam: '/node-ram',
  nodeDisks: '/node-disks',
  getLatestDisks: 'node-disks/get-latest-disks',
  nodeDiskPartitions: '/node-disk-partitions',
  dashboard: '/settings/dashboard',
  users: '/users',
  nodeLogs: '/node-logs',
  nodeUsers: '/node-users/get-latest',
  nodePackages: '/node-packages/get-latest',
  nodeReport: '/reports/generate',
};

export const pageRoutes = {
  dashboard: '/',
  users: '/users/list',
  editUser: '/users',
  createUser: '/users/create',
  nodes: '/nodes',
  createNode: '/nodes/create',
  createReport: '/reports/create',
};
