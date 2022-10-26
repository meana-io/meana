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

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const elements = [...Array(10).keys()];

const Index: NextPage = () => {
  const onLayoutChange = (layout) => {
    console.log(layout);
  };

  return (
    <MainLayout>
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={310}
        useCSSTransforms={true}
        measureBeforeMount={false}
        onLayoutChange={onLayoutChange}
      >
        {elements.map((v) => (
          <div key={v}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  Eaample {v}
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
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </MainLayout>
  );
};

export default Index;
