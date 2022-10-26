import TabsProvider from '@/contexts/tabsContext';
import MainLayout from '@/layouts/Main';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <TabsProvider>
      <MainLayout>Hello world</MainLayout>
    </TabsProvider>
  );
};

export default Index;
