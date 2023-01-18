import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { Card, CardHeader, Box } from '@mui/material';
import useChart from '@/components/Chart/useChart';
import ToogleToDashboard from '@/components/ToogleToDashboard/ToogleToDashboard';
import { useRouter } from 'next/router';
import { COMPONENT_NAME } from '@/components/Dashboard/Cpu/CpuUsageGraph';
import { hashParams } from '@/utility/hashParams';

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
  const router = useRouter();
  const nodeId = router.query.id as string;

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

  const hash = hashParams(COMPONENT_NAME, nodeId, title, '');

  return (
    <Card variant="outlined">
      <CardHeader
        title={title}
        subheader={subheader}
        action={<ToogleToDashboard hash={hash} />}
      />
      <Box sx={{ p: 3, pb: 1 }}>
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
