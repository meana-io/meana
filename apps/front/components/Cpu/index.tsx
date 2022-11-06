import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import NodeCpu from '@/types/cpu';
import CpuDetails from './CpuDetails';
import { useGetNodeCpu } from '@/api/cpu';
import AreaChartCard from '../ChartCards/AreaChartCard';

const getCPUUsage = (cpu: NodeCpu[]) => {
  return [
    {
      name: 'Usage',
      data: cpu.map(({ usage, time }) => {
        return [
          new Date(time).getTime() + 7200000,
          parseFloat(usage).toFixed(2),
        ];
      }),
    },
  ];
};

const Cpu: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: cpu, isLoading } = useGetNodeCpu(nodeId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={6}>
        <CpuDetails cpu={cpu.at(-1)} />
      </Grid>
      <Grid item xs={12}>
        <AreaChartCard title="CPU usage" series={getCPUUsage(cpu)} detailed />
      </Grid>
    </Grid>
  );
};

export default Cpu;
