import { NextPage } from 'next';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import DashboardLayout from '@/layouts/Dashboard/DashboardLayout';
import { DASHBOARD_COMPONENTS } from '@/components/Dashboard/componentsList';
import { deHashParams } from '@/utility/hashParams';
import useDashboard from '@/hooks/useDashboard';
import Progress from '@/components/Progress/Progress';
import useMeasure from 'react-use-measure';
import { useEffect } from 'react';

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

const Dashboard: NextPage = () => {
  const { components, layouts, isLoading, onLayoutChange, refetch } =
    useDashboard();
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <DashboardLayout>
      {isLoading && <Progress />}
      {components && (
        <div ref={ref}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={breakpoints}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
            width={bounds.width}
            onLayoutChange={onLayoutChange}
          >
            {components?.map((hash) => {
              const [componentName] = deHashParams(hash);
              if (DASHBOARD_COMPONENTS[componentName]) {
                const Comp = DASHBOARD_COMPONENTS[componentName];
                return (
                  <div
                    key={hash}
                    className="widget"
                    data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
                  >
                    <Comp hash={hash} />
                  </div>
                );
              }
              return null;
            })}
          </ResponsiveGridLayout>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
