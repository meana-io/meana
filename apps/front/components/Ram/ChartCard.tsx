import { Card, CardContent, CardHeader } from '@mui/material';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartCardProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, options, data }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Chart options={options} series={data} type="area" height={300} />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
