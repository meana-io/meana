import { createContext, useState } from 'react';


interface DashboardContextProps {
  components: string[];
  addToDashboard: (hash: string) => void;
  removeFormDashboard: (hash: string) => void;
}

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
}

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [components, setComponents] = useState<string[]>([
    'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Capacity**capacity',
    'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Manufacture**manufacture',
    'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Model**model',
    'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Serial Number**serialNumber',
    'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Name**name',
    'partition_custom_card**6838026240**Path**path',
    'partition_custom_card**6838026240**Used Space**usedSpace',
    'partition_custom_card**6838026240**Capacity**capacity',
    'partition_custom_card**6838026240**File System**fileSystem',
    'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Model**model',
    'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Manufacture**manufacture',
    'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Cores Quantity**coresQuantity',
  ]);

  const addToDashboard = (hash) => {
    setComponents([...components, hash]);
  };

  const removeFormDashboard = (hashToRemove) => {
    setComponents(components.filter((hash) => hash != hashToRemove));
  };

  const value = { components, addToDashboard, removeFormDashboard };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
