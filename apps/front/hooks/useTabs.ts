import { useContext } from 'react';
import { TabsContext } from '@/contexts/TabsContext';

const useTabs = () => {
  const context = useContext(TabsContext);

  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }

  return context;
};

export default useTabs;
