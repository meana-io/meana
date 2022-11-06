import { Box, Paper, Typography } from '@mui/material';
import * as Colors from '@mui/material/colors';
import dynamic from 'next/dynamic';
import { Color, Shade } from '@/types/color';
import AddToFavorites from '../AddToFavorites/AddToFavorites';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const simpleChartConfig = {
  theme: {
    mode: 'dark',
  },
  chart: {
    background: 'transparent',
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  tooltip: {
    y: {
      custom: ({ series, seriesIndex, dataPointIndex }) =>
        String.raw`<div class="custom-tooltip"><span>${series[seriesIndex][dataPointIndex]}%</span></div>`,
    },
    stroke: {
      width: 5,
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
  },
};

const detailedCartConfig = {
  theme: {
    mode: 'dark',
  },
  chart: {
    background: 'transparent',
    toolbar: {
      show: false,
    },
  },
  tooltip: {
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

interface AreaChartCardProps {
  title: string;
  series: any[];
  value: string;
  color?: Color;
  shade?: Shade;
  detailed?: boolean;
}

const AreaChartCard: React.FC<AreaChartCardProps> = ({
  title,
  series,
  value,
  color = 'grey',
  shade = 50,
  detailed,
}) => {
  const config = detailed ? detailedCartConfig : simpleChartConfig;
  const height = detailed ? 250 : 120;

  return (
    <Paper variant="elevation">
      <Box display="flex" flexDirection="column">
        <Box p={3} display="flex" flexDirection="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="span" variant="h6">
              {value}
            </Typography>
            <AddToFavorites />
          </Box>
          <Typography variant="subtitle1">{title}</Typography>
          <Box display="flex" alignItems="center" mt={1}></Box>
        </Box>
        <Box>
          <Chart
            options={{
              ...config,
              colors: [Colors[color][shade]],
            }}
            height={height}
            type="area"
            series={series}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default AreaChartCard;
