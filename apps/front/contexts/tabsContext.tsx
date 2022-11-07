'use client';
import { createContext, useState } from 'react';

interface TabsContextProps {
  initialTab?: number;
  activeTab: number;
  onChangeActiveTab: (
    event: React.SyntheticEvent<Element, Event>,
    newActiveTabIndex: number
  ) => void;
}

export const TabsContext = createContext<TabsContextProps | undefined>(
  undefined
);

interface TabsProviderProps {
  initialTab?: number;
  children: React.ReactNode;
}

const TabsProvider: React.FC<TabsProviderProps> = ({
  children,
  initialTab = 0,
}) => {
  const [activeTab, setActiveTab] = useState<number>(initialTab);

  const onChangeActiveTab = (
    event: React.SyntheticEvent,
    newActiveTabIndex: number
  ) => {
    setActiveTab(newActiveTabIndex);
  };

  const value = { activeTab, onChangeActiveTab };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export default TabsProvider;
