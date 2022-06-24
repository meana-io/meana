import instance from '@/utility/axios';

export const getNodes = () => {
  return instance.get('/nodes');
};
