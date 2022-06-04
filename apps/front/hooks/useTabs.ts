import { TabsContext } from '@/contexts/tabsContext';
import { useContext } from 'react';

const useTabs = () => {
  const context = useContext(TabsContext);

  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }

  return context;
};

export default useTabs;
