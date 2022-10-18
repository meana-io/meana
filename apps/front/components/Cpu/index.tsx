import { Grid } from '@mui/material';

// import ChartCard from './ChartCard';
import NodeCpu from '@/types/cpu';
import CpuDetails from './CpuDetails';
import ChartCard from './ChartCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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

interface CpuProps {
  cpu: NodeCpu[];
}

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

const Cpu: React.FC<CpuProps> = ({ cpu }) => {
  const router = useRouter();
  const { id: nodeId } = router.query;
  const [cpuUsage, setCpuUsage] = useState(cpu);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { data: currentCpuUsage } = await axios.get(
        `/api/cpu?id=${nodeId}`
      );
      setCpuUsage(currentCpuUsage);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
            data={getCPUUsage(cpuUsage)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cpu;
