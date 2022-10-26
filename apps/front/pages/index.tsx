import { NextPage } from 'next';

import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';


import MainLayout from '@/layouts/Main';
import DashboardModal from '@/components/Dashboard/Modal/DashboardModal';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const CARD_HEIGHT = 310 as const;

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

const BASE_LAYOUT = generateBaseLayout();

const objectEquals = (a: object, b: object) =>
  JSON.stringify(a) === JSON.stringify(b);

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
        rowHeight={CARD_HEIGHT}
        useCSSTransforms={true}
        measureBeforeMount={false}
        onLayoutChange={onLayoutChange}
      >
        {BASE_LAYOUT.map(({ i }) => (
          <Card key={i}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                Eaample {i}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </ResponsiveReactGridLayout>
      <DashboardModal />
    </MainLayout>
  );
};

export default Index;
