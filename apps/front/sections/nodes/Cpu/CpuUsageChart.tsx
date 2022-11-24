import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { Card, CardHeader, Box } from '@mui/material';
import useChart from '@/components/Chart/useChart';

interface ChartData {
  fill: 'gradient' | 'solid';
  name: string;
  data: number[];
  type: 'area' | 'line' | 'column';
}

interface CpuUsageChartProps {
  title: string;
  subheader?: string;
  chartColors?: string[];
  chartData: ChartData[];
  chartLabels: string[];
}

const CpuUsageChart: React.FC<CpuUsageChartProps> = ({
  title,
  subheader,
  chartLabels,
  chartData,
}) => {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    yaxis: {
      min: 0,
      max: 100,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}%`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
};
export default CpuUsageChart;