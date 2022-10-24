import { useRouter } from 'next/router';

import { Grid } from '@mui/material';

import ChartCard from './ChartCard';
import NodeRam from '@/types/ram';
import RamDetails from './RamDetails';
import { useGetNodeRam } from '@/hooks/queries/useNodeRam';

const RAM_USAGE_CHART_CONFIG = {
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

const toPercentage = (used: string, total: string) => {
  return Math.floor((parseInt(used, 10) / parseInt(total, 10)) * 100);
};

const ramToChart = (ram: NodeRam[]) => {
  return [
    {
      name: 'Usage',
      data: ram.map(({ total, used, time }) => {
        return [new Date(time).getTime() + 7200000, toPercentage(used, total)];
      }),
    },
  ];
};

const Ram: React.FC = () => {
  const router = useRouter();
  const { id: nodeId } = router.query;
  const { data: ram } = useGetNodeRam(nodeId as string, {
    // Refetch the data every 10 seconds
    refetchInterval: 1000 * 10,
  });

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={6}>
        <RamDetails ram={ram[ram?.length - 1]} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartCard
          title="Ram usage"
          options={RAM_USAGE_CHART_CONFIG}
          data={ramToChart(ram)}
        />
      </Grid>
    </Grid>
  );
};

export default Ram;
