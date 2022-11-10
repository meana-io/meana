import { Box, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import AddToFavorites from '../ToogleToDashboard/ToogleToDashboard';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const defaultOptions = {
  theme: {
    mode: 'dark',
  },
  chart: {
    background: 'transparent',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    show: false,
  },
  legend: {
    show: true,
    position: 'bottom',
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      radius: 12,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 30,
    },
  },
};

interface DonutCartCardProps {
  title: string;
  value: string;
  labels: string[];
  series: any[];
}

const DonutCartCard: React.FC<DonutCartCardProps> = ({
  title,
  value,
  labels,
  series,
}) => {
  const options = {
    ...defaultOptions,
    labels,
  };

  return (
    <Paper variant="elevation">
      <Box display="flex" flexDirection="column">
        <Box p={3} display="flex" flexDirection="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" mt={1}>
              <Typography component="span" variant="h6">
                {value}
              </Typography>
            </Box>
            <AddToFavorites />
          </Box>
          <Typography variant="subtitle1">{title}</Typography>
          <Box display="flex" alignItems="center" mt={1}></Box>
        </Box>
        <Box pb={2}>
          <Chart options={options} type="donut" series={series} />
        </Box>
      </Box>
    </Paper>
  );
};

export default DonutCartCard;
