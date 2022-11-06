import { NextPage } from 'next';
import { Responsive, WidthProvider } from 'react-grid-layout';

import MainLayout from '@/layouts/Main';
import { useEffect, useState } from 'react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const generateBaseLayout = (n = 7) => {
  const maxInRow = 4;
  const width = 1;
  const height = 1;
  const cols = 4;
  return [...Array(n).keys()].map((key, index) => {
    return {
      w: width,
      h: height,
      x: (width * index) % cols,
      y: Math.floor(index / maxInRow),
      i: `${key}`,
    };
  });
};

const COMPONENTS_CONFIG = {
  'ram_component/1': {
    i: 'ram_component/1',
    key: 'ram_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
  'cpu_component/1': {
    i: 'cpu_component/1',
    key: 'cpu_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
  'cpu_component/2': {
    i: 'cpu_component/2',
    key: 'cpu_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
  'cpu_component/3': {
    i: 'cpu_component/3',
    key: 'cpu_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
  'cpu_component/4': {
    i: 'cpu_component/4',
    key: 'cpu_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
  'cpu_component/5': {
    i: 'cpu_component/5',
    key: 'cpu_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
  'cpu_component/6': {
    i: 'cpu_component/6',
    key: 'cpu_component',
    query: 'dceb57db-49b3-46c3-b091-742583f76c85',
  },
};

const BASE_LAYOUT = generateBaseLayout();

const creaetNewLayout = (layout: any, components: any) =>
  layout.reduce((config, { i, w, x, y, h }) => {
    config[i] = {
      x,
      y,
      w,
      h,
      ...components[i],
    };

    return config;
  }, {});

const setItem = (data: object) => {
  localStorage.setItem('LAYOUT', JSON.stringify(data));
};

const Index: NextPage = () => {
  const [layout, setLayout] = useState<any>(BASE_LAYOUT);
  const onLayoutChange = (layout) => {
    const newLayout = creaetNewLayout(layout, COMPONENTS_CONFIG);
    console.log(newLayout);
    // setItem(newLayout);
  };

  useEffect(() => {
    const getItem = () => {
      return Object.entries(JSON.parse(localStorage.getItem('LAYOUT'))).map(
        ([_, v]) => v
      );
    };

    setLayout(getItem() || BASE_LAYOUT);
  }, [setLayout]);

  return (
    <MainLayout>
      {/* <ResponsiveReactGridLayout
        className="layout"
        layouts={{
          lg: layout,
        }}
        cols={{
          lg: 4,
          md: 3,
          sm: 2,
          xs: 1,
          xxs: 1,
        }}
        rowHeight={123}
        useCSSTransforms={true}
        measureBeforeMount={false}
        onLayoutChange={onLayoutChange}
      ></ResponsiveReactGridLayout> */}
    </MainLayout>
  );
};

export default Index;
