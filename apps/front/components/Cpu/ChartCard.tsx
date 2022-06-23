import { Box, Card, CardContent, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartCardProps {
  title: string;
  series: number[];
  labels: string[];
}

const ChartCard: React.FC<ChartCardProps> = ({ title, series, labels }) => {
  const options = {
    labels,
  };

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          {title}
        </Typography>
      </CardContent>

      <Box p={2}>
        <Chart options={options} series={series} type="donut" />
      </Box>
    </Card>
  );
};

export default ChartCard;
