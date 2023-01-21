import { NextPage } from 'next';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import DashboardLayout from '@/layouts/Dashboard/DashboardLayout';
import { DASHBOARD_COMPONENTS } from '@/components/Dashboard/componentsList';
import { deHashParams } from '@/utility/hashParams';
import useDashboard from '@/hooks/useDashboard';
import Progress from '@/components/Progress/Progress';
import NoData from '@/components/NoData/NoData';
import useMeasure from 'react-use-measure';

const Dashboard: NextPage = () => {
  const { components, isLoading, onLayoutChange, refetch } = useDashboard();
  const [ref, bounds] = useMeasure();

  if (!components || components?.length === 0) {
    refetch();
  }
  return (
    <DashboardLayout>
      {isLoading && <Progress />}
      {!components && <NoData />}
      {components && (
        <div ref={ref}>
          <ResponsiveGridLayout
            className="layout"
            layouts={{
              lg: components,
            }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
            width={bounds.width}
            onLayoutChange={onLayoutChange}
          >
            {components?.map(({ i }) => {
              const [componentName] = deHashParams(i);
              if (DASHBOARD_COMPONENTS[componentName]) {
                const Comp = DASHBOARD_COMPONENTS[componentName];
                return (
                  <div
                    key={i}
                    className="widget"
                    data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
                  >
                    <Comp hash={i} />
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
