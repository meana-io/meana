import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Grid } from '@mui/material';

import ChartCard from './ChartCard';
import Ram from '@/types/ram';

interface RamProps {
  ram: Ram[];
}

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

const ramToChart = (ram: Ram[]) => {
  return [
    {
      name: 'Usage',
      data: ram.map(({ total, used, time }) => {
        return [new Date(time).getTime(), toPercentage(used, total)];
      }),
    },
  ];
};
const Ram: React.FC<RamProps> = ({ ram }) => {
  const router = useRouter();
  const { id: nodeId } = router.query;

  console.log(nodeId);
  const [ramUsage, setRamUsage] = useState(ram);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { data: nodeRam } = await axios.get(
        'http://135.125.190.40:3333/api/node-ram',
        {
          data: {
            where: {
              nodeId,
            },
            linit: 50,
          },
        }
      );

      setRamUsage(nodeRam);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} md={6}>
        <ChartCard
          title="Ram usage"
          options={RAM_USAGE_CHART_CONFIG}
          data={ramToChart(ramUsage)}
        />
      </Grid>
    </Grid>
  );
};

export default Ram;
