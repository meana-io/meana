import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import NodeCpu from '@/types/cpu';
import CpuDetails from './CpuDetails';
import ChartCard from './ChartCard';
import { useGetNodeCpu } from '@/hooks/queries/useNodeCpu';

const CPU_USAGE_CHART_CONFIG = {
  chart: {
    height: 230,
    foreColor: '#ccc',
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (value) => `${value}%`,
    },
  },
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    min: 0,
    max: 100,
    labels: {
      formatter: (value) => `${value}%`,
    },
  },
  xaxis: {
    type: 'datetime',
  },
  fill: {
    type: 'gradient',
  },
};

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
  const { id: nodeId } = router.query;
  const { data: cpu } = useGetNodeCpu(nodeId as string);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={12}>
          <CpuDetails cpu={cpu[cpu.length - 1]} />
        </Grid>
        <Grid item xs={12}>
          <ChartCard
            title="CPU usage"
            options={CPU_USAGE_CHART_CONFIG}
            data={getCPUUsage(cpu)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cpu;
