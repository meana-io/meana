import { NextPage } from 'next';
import { Responsive, WidthProvider } from 'react-grid-layout';

import DashboardLayout from '@/layouts/Dashboard/DashboardLayout';
import { useState } from 'react';

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

const Test: NextPage = () => {
  const [layout, setLayout] = useState<any>(BASE_LAYOUT);
  const onLayoutChange = (layout) => {
    console.log('Layout changed: ', layout);
  };
  return (
    <DashboardLayout>
      <ResponsiveReactGridLayout
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
      >
        <div key="1">awdadwdwd</div>
        <div key="2">awdadwdwd</div>
        <div key="3">awdadwdwd</div>
        <div key="4">awdadwdwd</div>
        <div key="5">awdadwdwd</div>
      </ResponsiveReactGridLayout>
    </DashboardLayout>
  );
};

export default Test;
