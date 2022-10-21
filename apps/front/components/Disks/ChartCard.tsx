import { Card, CardContent, CardHeader } from '@mui/material';
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
    <Card sx={{ height: '100%' }}>
      <CardHeader title={title} />
      <CardContent>
        <Chart
          options={options}
          series={series}
          labels={labels}
          type="donut"
          height={200}
        />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
