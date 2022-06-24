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
  return (
    <Grid container spacing={2} direction="column">
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
