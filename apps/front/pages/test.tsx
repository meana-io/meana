import { NextPage } from 'next';
import { Responsive, WidthProvider } from 'react-grid-layout';

import DashboardLayout from '@/layouts/Dashboard/DashboardLayout';
import { useState } from 'react';
import axios from 'axios';

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

const Test: NextPage = async () => {
  const response = await axios.post(
    'https://api.meana.ovh/api/settings/dashboard',
    {
      value: JSON.stringify({
        lg: [
          {
            w: '1',
            h: '1',
            x: '0',
            y: '0',
            i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Capacity**capacity',
          },
          {
            w: '1',
            h: '1',
            x: '1',
            y: '1',
            i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Manufacture**manufacture',
          },
          {
            w: '1',
            h: '1',
            x: '1',
            y: '0',
            i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Model**model',
          },
          {
            w: '1',
            h: '1',
            x: '0',
            y: '1',
            i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Serial Number**serialNumber',
          },
          {
            w: '1',
            h: '1',
            x: '2',
            y: '0',
            i: 'disk_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**dm-0**Name**name',
          },
          {
            w: '1',
            h: '1',
            x: '2',
            y: '1',
            i: 'partition_custom_card**6838026240**Path**path',
          },
          {
            w: '1',
            h: '1',
            x: '2',
            y: '2',
            i: 'partition_custom_card**6838026240**Used Space**usedSpace',
          },
          {
            w: '1',
            h: '1',
            x: '0',
            y: '2',
            i: 'partition_custom_card**6838026240**Capacity**capacity',
          },
          {
            w: '1',
            h: '1',
            x: '1',
            y: '2',
            i: 'partition_custom_card**6838026240**File System**fileSystem',
          },
          {
            w: '1',
            h: '1',
            x: '1',
            y: '3',
            i: 'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Model**model',
          },
          {
            w: '1',
            h: '1',
            x: '0',
            y: '3',
            i: 'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Manufacture**manufacture',
          },
          {
            w: '1',
            h: '1',
            x: '2',
            y: '3',
            i: 'cpu_custom_card**dceb57db-49b3-46c3-b091-742583f76c85**Cores Quantity**coresQuantity',
          },
        ],
      }),
    }
  );
  return (
    <DashboardLayout>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </DashboardLayout>
  );
};

export default Test;
