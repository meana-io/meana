import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { Card, CardHeader, Box } from '@mui/material';
import useChart from '@/components/Chart/useChart';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';
import ToogleToDashboard from '@/components/ToogleToDashboard/ToogleToDashboard';
import { useGetNodeRam } from '@/api/ram';
import { getRamLabels, getRamUsage } from 'sections/nodes/Ram/Ram';

interface RamUsageGraphProps {
  hash: string;
}


const RamUsageGraph: React.FC<RamUsageGraphProps> = ({ hash }) => {
  const [_, query, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeRam(
    query,
    {},
    {
      refetchInterval: 1000 * 15,
    }
  );

  const chartLabels = getRamLabels(data);
  const chartData = [
    {
      name: 'Usage',
      type: 'area',
      fill: 'gradient',
      data: getRamUsage(data),
    },
  ];

  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
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

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Card>
      <CardHeader title={title} action={<ToogleToDashboard hash={hash} />} />
      <Box sx={{ p: 3, pb: 1 }}>
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={120}
        />
      </Box>
    </Card>
  );
};

export const COMPONENT_NAME = 'ram_dashboard_usage_graph';

export default RamUsageGraph;
