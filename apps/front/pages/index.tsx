import { NextPage } from 'next';

import MainLayout from '@/layouts/Main';
import TabsProvider from '@/contexts/tabsContext';

const Index: NextPage = () => {
  return (
    <TabsProvider>
      <MainLayout>Please select Node</MainLayout>
    </TabsProvider>
  );
};

export default Index;
