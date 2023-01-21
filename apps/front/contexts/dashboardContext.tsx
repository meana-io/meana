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

interface ScreenSizes {
  lg?: Layout[];
  md?: Layout[];
  sm?: Layout[];
  xs?: Layout[];
  xxs?: Layout[];
}

interface DashboardContextProps {
  isActive: (hash: string) => boolean;
  components: string[];
  isLoading: boolean;
  addToDashboard: (hash: string) => void;
  removeFormDashboard: (hash: string) => void;
  onLayoutChange: (layout: Layout[], layouts: ScreenSizes[]) => void;
  refetch;
  layouts: ScreenSizes;
}

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
}

const getLayout = (layout: ScreenSizes) => {
  return Object.entries(layout).reduce((l, [size, components]) => {
    return {
      ...l,
      [size]: components?.map(({ x, y, w, h, i }) => ({
        x,
        y,
        w,
        h,
        i,
      })),
    };
  }, {});
};

const getComponents = (components: Layout[]) => {
  return components?.map(({ i }) => i);
};

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [components, setComponents] = useState<string[]>([]);
  const [_layouts, _setLayouts] = useState<ScreenSizes>({});
  const { user } = useAuth();

  const [count, setCount] = useState(0);
  const {
    data: dashboardSettings,
    isLoading,
    refetch,
  } = useGetDashboard(user?.sub, {
    enabled: !!user?.sub,
  });

  const { mutateAsync } = useUpdateDashboard(user?.sub);

  useEffect(() => {
    setComponents(dashboardSettings?.value?.components);
    _setLayouts(dashboardSettings?.value?.layouts);
  }, [dashboardSettings?.value, isLoading]);

  const onLayoutChange = (layout, layouts) => {
    if (count > 0) {
      mutateAsync({
        ...dashboardSettings,
        value: JSON.stringify({
          layouts: getLayout(layouts),
          components: getComponents(layout),
        }),
      });
    }
    setCount(1);
  };

  const addToDashboard = (hash) => {
    const payload = {
      layouts: _layouts,
      components: [...components, hash],
    };
    mutateAsync({
      ...dashboardSettings,
      value: JSON.stringify(payload),
    });
  };

  const isActive = (hash: string) => {
    return components?.includes(hash);
  };

  const removeFormDashboard = (hashToRemove) => {
    const newComponents = components?.filter((hash) => hash !== hashToRemove);
    mutateAsync({
      ...dashboardSettings,
      value: JSON.stringify({
        components: newComponents,
      }),
    });
  };

  const value = {
    isActive,
    isLoading,
    onLayoutChange,
    components,
    addToDashboard,
    removeFormDashboard,
    refetch,
    layouts: _layouts,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
