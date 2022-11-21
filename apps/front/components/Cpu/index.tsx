import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import NodeCpu from '@/types/cpu';
import CpuDetails from './CpuDetails';
import { useGetNodeCpu } from '@/api/cpu';
import CpuUsageChart from 'sections/nodes/CpuUsageChart';
import Progress from '../Progress/Progress';

const getCpuLabels = (cpu: NodeCpu[]) => cpu.map(({ time }) => time);

const getCpuUsage = (cpu: NodeCpu[]) =>
  cpu.map(({ usage }) => parseInt(usage, 10));

const Cpu: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: cpu, isLoading } = useGetNodeCpu(nodeId);

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={6}>
        <CpuDetails cpu={cpu.at(-1)} />
      </Grid>
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
    </Grid>
  );
};

export default Cpu;
