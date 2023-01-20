import { useGetDashboard, useUpdateDashboard } from '@/api/dashboard';
import useAuth from '@/hooks/useAuth';
import { createContext, useEffect, useState } from 'react';

interface Layout {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}

interface DashboardContextProps {
  isActive: (hash: string) => boolean;
  components: Layout[];
  isLoading: boolean;
  addToDashboard: (hash: string) => void;
  removeFormDashboard: (hash: string) => void;
  onLayoutChange: (Layout) => void;
}

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
}

const getLayout = (layout: Layout[]) => {
  return layout.map(({ x, y, w, h, i }) => ({
    x,
    y,
    w,
    h,
    i,
  }));
};

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [components, setComponents] = useState<Layout[]>([]);
  const { user } = useAuth();

  const [count, setCount] = useState(0);
  const { data: dashboardSettings, isLoading } = useGetDashboard(user?.sub, {
    enabled: !!user?.sub,
    retryDelay: 100,
  });

  const { mutateAsync } = useUpdateDashboard(user?.sub);

  useEffect(() => {
    setComponents(dashboardSettings?.value);
  }, [dashboardSettings?.value, isLoading]);

  const onLayoutChange = (layout) => {
    if (count > 0) {
      mutateAsync({
        ...dashboardSettings,
        value: JSON.stringify(getLayout(layout)),
      });
    }
    setCount(1);
  };

  const addToDashboard = (hash) => {
    mutateAsync({
      ...dashboardSettings,
      value: JSON.stringify([
        ...components,
        {
          x: 0,
          y: Infinity,
          w: 3,
          h: 3,
          i: hash,
        },
      ]),
    });
  };

  const isActive = (hash: string) => {
    return components?.map(({ i }) => i).includes(hash);
  };

  const removeFormDashboard = (hashToRemove) => {
    const newComponents = components.filter(({ i }) => i !== hashToRemove);
    mutateAsync({
      ...dashboardSettings,
      value: JSON.stringify(newComponents),
    });
  };

  const value = {
    isActive,
    isLoading,
    onLayoutChange,
    components,
    addToDashboard,
    removeFormDashboard,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
