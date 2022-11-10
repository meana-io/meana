import { createContext, useState } from 'react';

interface DashboardComponent {
  component: string;
  query: string;
}

interface DashboardContextProps {
  components: DashboardComponent[];
  addToDashboard: (component: string, query: string) => void;
  removeFormDashboard: (component: string, query: string) => void;
}

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
}

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [components, setComponents] = useState<DashboardComponent[]>([]);

  const addToDashboard = (component, query) => {
    setComponents(components.concat([component, query]));

    console.log({ components, component });
  };

  const removeFormDashboard = (component, query) => {
    setComponents(component);
  };

  const value = { components, addToDashboard, removeFormDashboard };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
