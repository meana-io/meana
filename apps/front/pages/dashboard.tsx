import { NextPage } from 'next';
import { Responsive, WidthProvider } from 'react-grid-layout';

import DashboardLayout from '@/layouts/Dashboard/DashboardLayout';
import { DASHBOARD_COMPONENTS } from '@/components/Dashboard/componentsList';
import { deHashParams } from '@/utility/hashParams';
import useDashboard from '@/hooks/useDashboard';
import Progress from '@/components/Progress/Progress';
import NoData from '@/components/NoData/NoData';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard: NextPage = () => {
  const { components, isLoading, onLayoutChange } = useDashboard();

  return (
    <DashboardLayout>
      {isLoading && <Progress />}
      {!components && <NoData />}
      {components && (
        <ResponsiveReactGridLayout
          layouts={{
            lg: components,
          }}
          className="layout"
          cols={{
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1,
            xxs: 1,
          }}
          rowHeight={223}
          useCSSTransforms={true}
          measureBeforeMount={false}
          onLayoutChange={onLayoutChange}
        >
          {components?.map(({ i }) => {
            const [componentName] = deHashParams(i);
            if (DASHBOARD_COMPONENTS[componentName]) {
              const Comp = DASHBOARD_COMPONENTS[componentName];
              return (
                <div key={i}>
                  <Comp hash={i} />
                </div>
              );
            }
            return null;
          })}
        </ResponsiveReactGridLayout>
      )}
    </DashboardLayout>
  );
};


export default Dashboard;
