import useIsMobile from '@/hooks/isMobile';
import { DrawerProps } from '@mui/material';
import { createContext, useState } from 'react';

interface DrawerContextProps {
  variant: DrawerProps['variant'];
  isOpen: boolean;
  toggleDrawer: () => void;
  isMobile: boolean;
}

export const DrawerContext = createContext<DrawerContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const DrawerProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const value = {
    isMobile,
    variant: (isMobile ? 'temporary' : 'permanent') as DrawerProps['variant'],
    isOpen: isDrawerOpen,
    toggleDrawer,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerProvider;
