import { NextPage } from 'next';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

const Index: NextPage = () => {
  return (
    <MainLayout>
      <Disks />
    </MainLayout>
  );
};

export default Index;
