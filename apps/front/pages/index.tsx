import { NextPage } from 'next';
import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import DashboardLayout from '@/layouts/Dashboard/DashboardLayout';
import useDashboard from '@/hooks/useDashboard';
import { DASHBOARD_COMPONENTS } from '@/components/Dashboard/componentsList';
import { deHashParams } from '@/utility/hashParams';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Test: NextPage = () => {
  const { components } = useDashboard();
  const [layout, setLayout] = useState<any>({
    lg: [
      {
        w: 1,
        h: 1,
        x: 0,
        y: 0,
        i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Capacity**capacity',
      },
      {
        w: 1,
        h: 1,
        x: 1,
        y: 1,
        i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Manufacture**manufacture',
      },
      {
        w: 1,
        h: 1,
        x: 1,
        y: 0,
        i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Model**model',
      },
      {
        w: 1,
        h: 1,
        x: 0,
        y: 1,
        i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Serial Number**serialNumber',
      },
      {
        w: 1,
        h: 1,
        x: 2,
        y: 0,
        i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Name**name',
      },
      {
        w: 1,
        h: 1,
        x: 2,
        y: 1,
        i: 'partition_custom_card**6838026240**Path**path',
      },
      {
        w: 1,
        h: 1,
        x: 2,
        y: 2,
        i: 'partition_custom_card**6838026240**Used Space**usedSpace',
      },
      {
        w: 1,
        h: 1,
        x: 0,
        y: 2,
        i: 'partition_custom_card**6838026240**Capacity**capacity',
      },
      {
        w: 1,
        h: 1,
        x: 1,
        y: 2,
        i: 'partition_custom_card**6838026240**File System**fileSystem',
      },
      {
        w: 1,
        h: 1,
        x: 1,
        y: 3,
        i: 'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Model**model',
      },
      {
        w: 1,
        h: 1,
        x: 0,
        y: 3,
        i: 'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Manufacture**manufacture',
      },
      {
        w: 1,
        h: 1,
        x: 2,
        y: 3,
        i: 'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Cores Quantity**coresQuantity',
      },
    ],
  });
  const onLayoutChange = (layout) => {
    console.log('Layout changed: ', layout);
  };
  return (
    <DashboardLayout>
      <ResponsiveReactGridLayout
        layouts={layout}
        className="layout"
        cols={{
          lg: 4,
          md: 3,
          sm: 2,
          xs: 1,
          xxs: 1,
        }}
        rowHeight={150}
        useCSSTransforms={true}
        measureBeforeMount={false}
        onLayoutChange={onLayoutChange}
      >
        {components?.map((hash) => {
          const [componentName] = deHashParams(hash);

          if (DASHBOARD_COMPONENTS[componentName]) {
            const Comp = DASHBOARD_COMPONENTS[componentName];
            return (
              <div key={hash}>
                <Comp hash={hash} />
              </div>
            );
          }
          return null;
        })}
      </ResponsiveReactGridLayout>
    </DashboardLayout>
  );
};

export default Test;
