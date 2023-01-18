import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import NodeCpu from '@/types/cpu';
import CpuDetails from './CpuDetails';
import { useGetNodeCpu } from '@/api/cpu';
import CpuUsageChart from 'sections/nodes/Cpu/CpuUsageChart';
import Progress from '@/components/Progress/Progress';
import NoData from '@/components/NoData/NoData';

export const getCpuLabels = (cpu: NodeCpu[]) => cpu?.map(({ time }) => time);

export const getCpuUsage = (cpu: NodeCpu[]) =>
  cpu?.map(({ usage }) => parseInt(usage, 10));

const Cpu: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: cpu, isLoading } = useGetNodeCpu(
    nodeId,
    {},
    {
      refetchInterval: 1000 * 5,
    }
  );

  if (isLoading) {
    return <Progress />;
  }

  if (!cpu || cpu.length === 0) {
    return <NoData />;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <CpuUsageChart
          title="Cpu usage"
          chartLabels={getCpuLabels(cpu)}
          chartData={[
            {
              name: 'Usage',
              type: 'area',
              fill: 'gradient',
              data: getCpuUsage(cpu),
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CpuDetails cpu={cpu.at(-1)} />
      </Grid>
    </Grid>
  );
};

export default Cpu;
