import { useContext } from 'react';
import { DrawerContext } from '@/contexts/drawerContext';

const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerContext');
  }

  return context;
};

export default useDrawer;
