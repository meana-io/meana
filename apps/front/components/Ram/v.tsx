import { Grid } from '@mui/material';

import RamDetails from './RamDetails';
import ChartCard from './ChartCard';
import Ram from '@/types/ram';

interface RamProps {
  ram: Ram[];
}

const generateDayWiseTimeSeries = (baseval, count, yrange) => {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = baseval;
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
};

const data = generateDayWiseTimeSeries(new Date('22 Apr 2017').getTime(), 115, {
  min: 30,
  max: 90,
});

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
  const chartData = ramToChart(ram);
  chartData.data.length = 20;
  data.length = 20;

  console.log(chartData.data);
  console.log(data);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <ChartCard
          title="Ram usage"
          options={RAM_USAGE_CHART_CONFIG}
          data={{
            name: 'usage',
            data,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Ram;
