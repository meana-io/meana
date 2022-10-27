import { NextPage } from 'next';

import { Responsive, WidthProvider } from 'react-grid-layout';

import MainLayout from '@/layouts/Main';
import DashboardModal from '@/components/Dashboard/Modal/DashboardModal';

import ErrorBoundary from '@/components/Error';
import {
  COMPONENTS,
  COMPONENT_HEIGHT,
} from '@/components/Dashboard/Components';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const generateBaseLayout = (n = 7) => {
  const maxInRow = 6;
  const width = 2;
  const height = 1;
  return [...Array(n).keys()].map((key, index) => {
    return {
      w: width,
      h: height,
      x: (width * index) % 12,
      y: Math.floor(index / maxInRow),
      i: `${key}`,
    };
  });
};

const COMPONENTS_CONFIG = [
  {
    i: '0',
    key: 'ram_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
  {
    i: '1',
    key: 'cpu_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
];

const BASE_LAYOUT = generateBaseLayout();

const objectEquals = (a: object, b: object) =>
  JSON.stringify(a) === JSON.stringify(b);

const arrayToObj = (componenets: any) => {
  return componenets.reduce((obj, component) => {
    obj[component.key] = component;
    return obj;
  }, {});
};

const COMPONENTS_OBJ = arrayToObj(COMPONENTS);

const Index: NextPage = () => {
  const onLayoutChange = (layout) => {
    console.log(layout);
  };

  return (
    <MainLayout>
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{
          lg: BASE_LAYOUT,
        }}
        rowHeight={COMPONENT_HEIGHT}
        useCSSTransforms={true}
        measureBeforeMount={false}
        onLayoutChange={onLayoutChange}
      >
        {COMPONENTS_CONFIG.map(({ i, key, query }) => {
          if (COMPONENTS_OBJ[key]) {
            const { component: Component } = COMPONENTS_OBJ[key];
            return (
              <div key={i}>
                <ErrorBoundary>
                  <Component key={i} query={query} />
                </ErrorBoundary>
              </div>
            );
          }
        })}
      </ResponsiveReactGridLayout>
      <DashboardModal />
    </MainLayout>
  );
};

export default Index;
