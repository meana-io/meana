import { Box, Card, CardContent, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartCardProps {}

const ChartCard: React.FC<ChartCardProps> = ({}) => {
  const state = {
    options: {},
    series: [44, 55],
    labels: ['Used', 'Free'],
  };
  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          Disk - space
        </Typography>
      </CardContent>

      <Box p={2}>
        <Chart options={state.options} series={state.series} type="donut" />
      </Box>
    </Card>
  );
};

export default ChartCard;
