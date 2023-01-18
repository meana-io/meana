import { useGetNodeCpu } from '@/api/cpu';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import useChart from '@/components/Chart/useChart';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';
import { getCpuLabels, getCpuUsage } from 'sections/nodes/Cpu/Cpu';
import CustomCard from '@/components/CustomCard/CustomCard';
import { useGetNode } from '@/api/nodes';

interface CpuUsageGraphProps {
  hash: string;
}

const CpuUsageGraph: React.FC<CpuUsageGraphProps> = ({ hash }) => {
  const [_, query, title, key] = deHashParams(hash);
  const { data: node, isLoading: isLoadingNodeName } = useGetNode(query);

  const { data, isLoading } = useGetNodeCpu(
    query,
    {},
    {
      refetchInterval: 1000 * 5,
    }
  );

  const chartLabels = getCpuLabels(data);
  const chartData = [
    {
      name: 'Usage',
      type: 'area',
      fill: 'gradient',
      data: getCpuUsage(data),
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

  if (isLoading || isLoadingNodeName) {
    return <Progress />;
  }

  return (
    <CustomCard title={`${node.name}: ${title}`} hash={hash}>
      <ReactApexChart
        type="line"
        series={chartData}
        options={chartOptions}
        height={120}
      />
    </CustomCard>
  );
};

export const COMPONENT_NAME = 'cpu_dashboard_usage_graph';

export default CpuUsageGraph;
