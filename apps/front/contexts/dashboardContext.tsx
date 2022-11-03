import { Component } from '@/components/Dashboard/Components';
import { createContext, useState } from 'react';

interface DashboardContextProps {
  initiaLayout?: any;
  layout?: any;
  components?: any;
}

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

interface DashboardProviderProps {
  initiaLayout?: any;
  children: React.ReactNode;
}

const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  initiaLayout,
}) => {
  const [layout, setLayout] = useState<any>([]);
  const [components, setComponents] = useState<Component[]>([]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const onComponentsChagne = (newComponents) => {
    setComponents(newComponents);
  };

  const value = { components, onComponentsChagne, layout, onLayoutChange };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
